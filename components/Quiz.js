import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [detailedResults, setDetailedResults] = useState([]);

    useEffect(() => {
        async function loadRandomQuiz() {
            const allQuizIds = await fetchAllQuizIds();
            if (allQuizIds.length > 0) {
                const randomIndex = Math.floor(Math.random() * allQuizIds.length);
                const randomQuizId = allQuizIds[randomIndex];
                fetchQuiz(randomQuizId);
            } else {
                console.log("No quizzes found");
            }
        }

        loadRandomQuiz();
    }, []);

    async function fetchAllQuizIds() {
        try {
            const quizCollectionRef = collection(db, 'Quizzes');
            const quizDocsSnapshot = await getDocs(quizCollectionRef);
            const quizIds = quizDocsSnapshot.docs.map(doc => doc.id);
            return quizIds;
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
            fetchMedia(currentQuestion.mediaRef, currentQuestion.mediaType);
        }
    }, [quiz, currentQuestionIndex]);

    function fetchMedia(ref, type) {
        setMedia(ref);
        setMediaType(type);
    }

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
            if (currentQuestionIndex === quiz.questions.length - 1) {
                // Special message for the last question
                setFeedback("Let's check your score!");
            } else {
                setFeedback("Correct! You can move to the next question.");
            }
            setIsAnswerCorrect(true);
            result.isCorrect = true;
        } else if (almostCorrectText.includes(answer)) {
            setFeedback("You're close! Try again.");
            result.score = Math.max(result.score - 0.1, 0);
            setIsAnswerCorrect(false);
        } else {
            setFeedback("Wrong! Try again.");
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
            // Assuming results are shown when currentQuestionIndex exceeds quiz.questions.length
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setIsAnswerCorrect(false);
            setFeedback("");  // Reset feedback when moving to next question
        }
    }
}

    
    

    const renderMedia = () => {
        switch(mediaType) {
            case 'image':
                return <img src={media} alt="Quiz Visual" style={{ maxWidth: '100%', height: 'auto' }} />;
            case 'video':
                return (
                    <video controls style={{ maxWidth: '100%', height: 'auto' }}>
                        <source src={media} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'audio':
                return (
                    <audio controls style={{ width: '100%' }}>
                        <source src={media} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                );
            default:
                return null;
        }
    };

    const renderResults = () => {
        const totalScore = detailedResults.reduce((acc, curr) => acc + curr.score, 0);
        return (
            <div>
                <h1>Quiz Results</h1>
                {detailedResults.map((result, index) => (
                    <div key={index}>
                        <h3>Question {index + 1}: {result.question}</h3>
                        <p>Your answer: {result.yourAnswer}</p>
                        <p>Correct answer: {result.correctAnswer}</p>
                        <p>Score for this question: {result.score.toFixed(2)}</p>
                        <p>Status: {result.isCorrect ? "Correct" : "Incorrect"}</p>
                    </div>
                ))}
                <h2>Total Score: {totalScore.toFixed(2)}</h2>
            </div>
        );
    };

    if (!quiz) return <div>Loading quiz...</div>;
    if (currentQuestionIndex >= quiz.questions.length) return renderResults();

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div>
            <h1>Quiz</h1>
            <div>
                {renderMedia()}
                <h2>{currentQuestion.text}</h2>
                <p>{feedback}</p>
                <input 
                    type="text" 
                    value={userAnswers[currentQuestionIndex] || ''} 
                    onChange={handleAnswerChange} 
                    placeholder="Enter your answer"
                />
                <button onClick={handleSubmitAnswer}>Submit</button>
                <button 
                    onClick={handleNextQuestion} 
                    disabled={!isAnswerCorrect}
                >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
    
}

export default Quiz;
