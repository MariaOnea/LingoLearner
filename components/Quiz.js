import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import './Quiz.css'; 
function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [detailedResults, setDetailedResults] = useState([]);
    const [showResults, setShowResults] = useState(false);  // State to manage when to show results

    useEffect(() => {
        let isCancelled = false;
    
        async function loadRandomQuiz() {
            if (!isLoadingQuiz && !quiz) {
                setIsLoadingQuiz(true);
                const allQuizIds = await fetchAllQuizIds();
                if (allQuizIds.length > 0 && !isCancelled) {
                    const randomIndex = Math.floor(Math.random() * allQuizIds.length);
                    await fetchQuiz(allQuizIds[randomIndex]);
                } else if (!isCancelled) {
                    console.log("No quizzes found");
                }
                setIsLoadingQuiz(false);
            }
        }
    
        loadRandomQuiz();
    
        return () => { isCancelled = true; };
    }, []);

    async function fetchAllQuizIds() {
        try {
            const quizCollectionRef = collection(db, 'Quizzes');
            const quizDocsSnapshot = await getDocs(quizCollectionRef);
            return quizDocsSnapshot.docs.map(doc => doc.id);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            return [];
        }
    }

    async function fetchQuiz(quizId) {
        try {
            const docRef = doc(db, 'Quizzes', quizId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Fetched Quiz Data:", docSnap.data());
                setQuiz(docSnap.data());
            } else {
                console.log(`No quiz found with the specified ID: ${quizId}`);
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    }

    useEffect(() => {
        if (quiz && quiz.questions && quiz.questions.length > currentQuestionIndex) {
            const currentQuestion = quiz.questions[currentQuestionIndex];
            console.log("Fetching media for:", currentQuestion);
            setMedia(currentQuestion.mediaRef);
            setMediaType(currentQuestion.mediaType);
        }
    }, [quiz, currentQuestionIndex]);

    function handleAnswerChange(event) {
        const newAnswers = [...userAnswers.slice(0, currentQuestionIndex), event.target.value];
        setUserAnswers(newAnswers);
    }

    function handleSubmitAnswer() {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        const answer = (userAnswers[currentQuestionIndex] || '').trim();
        const correctText = currentQuestion.correctText || [];
        const almostCorrectText = currentQuestion.almostCorrectText || [];
        
        let result = detailedResults[currentQuestionIndex] || { score: 10, question: currentQuestion.text, correctAnswer: correctText.join(', ') };
        
        if (correctText.includes(answer)) {
            setFeedback("Corect!");
            setIsAnswerCorrect(true);
            result.isCorrect = true;
        } else if (almostCorrectText.includes(answer)) {
            setFeedback("Ești aproape! Mai încearcă.");
            result.score = Math.max(result.score - 0.1, 0);
            setIsAnswerCorrect(false);
        } else {
            setFeedback("Greșit! Mai încearcă.");
            result.score = Math.max(result.score - 0.5, 0);
            setIsAnswerCorrect(false);
        }
        
        result.yourAnswer = answer;
        const updatedResults = [...detailedResults];
        updatedResults[currentQuestionIndex] = result;
        setDetailedResults(updatedResults);
    }
    
    function handleNextQuestion() {
        if (isAnswerCorrect) {
            if (currentQuestionIndex === quiz.questions.length - 1) {
                setFeedback("Să vedem scorul!");
                setTimeout(() => {
                    setShowResults(true);  // Transition to results view
                }, 1500);  // Delay for user to read the message
            } else {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setIsAnswerCorrect(false);
                setFeedback("");
            }
        }
    }

    const renderMedia = () => {
        return (
            <div className="media-container">
                {mediaType === 'image' && <img src={media} alt="Quiz Visual"/>}
                {mediaType === 'video' && (
                    <video controls>
                        <source src={media} type="video/mp4"/>
                        Browser-ul tău nu suportă tag-ul video.
                    </video>
                )}
                {mediaType === 'audio' && (
                    <audio controls>
                        <source src={media} type="audio/mpeg"/>
                        Browser-ul tău nu suportă tag-ul audio.
                    </audio>
                )}
            </div>
        );
    };
    
    
    

    const renderResults = () => {
        const totalScore = detailedResults.reduce((acc, curr) => acc + curr.score, 0);
        return (
            <div>
                
                <h1>Rezultatele testului</h1>
                {detailedResults.map((result, index) => (
                    <div key={index} className="result-card">
                        <h3>Întrebarea {index + 1}: {result.question}</h3>
                        <p>Răspunsul tău: {result.yourAnswer}</p>
                        <p>Răspunsul corect: {result.correctAnswer}</p>
                        <p>Scorul pe această întrebare: {result.score.toFixed(2)}</p>
                    </div>
                ))}
                <h2>Scorul total: {totalScore.toFixed(2)}</h2>
            </div>
        
        );
    };
    

    if (!quiz) return <div>Se încarcă testul...</div>;
    if (showResults) return renderResults();  // Check if results should be displayed

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
    <h1 className="quiz-title">Test</h1>
    <p className="quiz-prompt">{quiz ? quiz.questions[currentQuestionIndex].text : "Loading question..."}</p>
    <div className="media-container">
        {renderMedia()}
    </div>
    <div className="input-container">
        <input type="text" className="answer-input" value={userAnswers[currentQuestionIndex] || ''} onChange={handleAnswerChange} placeholder="Scrie răspunsul aici" />
        <button className="submit-btn" onClick={handleSubmitAnswer}>Trimite</button>

        
    </div>
    {/* Display feedback near next button */}
    <p className="feedback-text">{feedback}</p>
    {currentQuestionIndex < quiz.questions.length - 1 ? 
        <button className="next-btn" onClick={handleNextQuestion} disabled={!isAnswerCorrect}>Următorul</button> :
        <button className="next-btn" onClick={handleNextQuestion} disabled={!isAnswerCorrect}>Termină</button>
    }
</div>
    );
}

export default Quiz;
