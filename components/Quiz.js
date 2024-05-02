import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    useEffect(() => {
        fetchQuiz();
    }, []);

    async function fetchQuiz() {
        try {
            
            const maxQuizzes = 11;
            const quizId = `Quiz ${Math.floor(Math.random() * maxQuizzes) + 1}`;
    
            const docRef = doc(db, 'Quizzes', quizId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Fetched Quiz Data:", docSnap.data());
                setQuiz(docSnap.data());
            } else {
                console.log("No quiz found with the specified ID:", quizId);
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
        }
    }
    

    useEffect(() => {
    if (quiz && quiz.questions && quiz.questions.length > currentQuestionIndex) {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        console.log("Fetching media for:", currentQuestion); // Debug: Log current question
        fetchMedia(currentQuestion.ref, currentQuestion.type);
    }
}, [quiz, currentQuestionIndex]); // React to changes in quiz or question index


    async function fetchMedia(ref, type) {
        const formattedType = `${type.charAt(0).toUpperCase() + type.slice(1)}s`;
        try {
            const docRef = doc(db, formattedType, ref);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Fetched Media Data:", docSnap.data()); // Ensure this logs all data, including correctText and almostCorrectText
                setMedia(docSnap.data().fileRef);
                setMediaType(type);
                // Check if media-related question data is being properly stored
                // This is just a check and should be adjusted according to your data structure
                if(docSnap.data().correctText && docSnap.data().almostCorrectText) {
                    let questionData = quiz.questions[currentQuestionIndex];
                    questionData.correctText = docSnap.data().correctText;
                    questionData.almostCorrectText = docSnap.data().almostCorrectText;
                    let newQuestions = [...quiz.questions];
                    newQuestions[currentQuestionIndex] = questionData;
                    setQuiz({...quiz, questions: newQuestions});
                }
            } else {
                console.log(`No media found with the specified ref (${ref}) and type (${formattedType}).`);
                setMedia(null);
                setMediaType(null);
            }
        } catch (error) {
            console.error("Error fetching media:", error);
        }
    }
    

    function handleAnswerChange(event) {
        const newAnswers = [...userAnswers.slice(0, currentQuestionIndex), event.target.value];
        setUserAnswers(newAnswers);
    }

    function handleSubmitAnswer() {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        const answer = (userAnswers[currentQuestionIndex] || '').trim();
    
        // Fallback to empty array if data is missing
        const correctText = currentQuestion.correctText || [];
        const almostCorrectText = currentQuestion.almostCorrectText || [];
    
        console.log("Submitted answer: ", answer);
        console.log("Correct answers list: ", correctText);
        console.log("Almost correct answers list: ", almostCorrectText);
    
        if (correctText.includes(answer)) {
            setFeedback("Correct! You can move to the next question.");
            setIsAnswerCorrect(true);
        } else if (almostCorrectText.includes(answer)) {
            setFeedback("You're close! Try again.");
            setIsAnswerCorrect(false);
        } else {
            setFeedback("Wrong! Try again.");
            setIsAnswerCorrect(false);
        }
    }
    
    
    


    function handleNextQuestion() {
        if (isAnswerCorrect) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
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
            case 'recording':
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

    if (!quiz) return <div>Loading quiz...</div>;
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (!currentQuestion) return <div>No more questions!</div>;

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
                <button onClick={handleNextQuestion} disabled={!isAnswerCorrect}>Next</button>
            </div>
        </div>
    );
}

export default Quiz;
