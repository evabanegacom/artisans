import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ToastContainer } from 'react-toastify';
import routes from './routes';  // Assuming you have a default export of routes
import ErrorBoundary from './components/error-boundary';
import Footer from './components/footer.tsx/footer';
import Navbar from './components/navbar/navbar';
import Spinner from './constants/spinner';
import Preview from './components/print-on-demand/preview';
import RenameDataset from './components/manuscript/rename-dataset';
import RespecifyVariable from './components/manuscript/respecify-variable';
import RespecifyDatasetMultiple from './components/manuscript/respecify-dataset-multiple';
import CloneVariable from './components/manuscript/clone-variable';
import RenameVariable from './components/manuscript/rename-variable';
import Relabel from './components/manuscript/relabel';
import DeleteVariable from './components/manuscript/delete-variable';
import DeleteRecords from './components/manuscript/delete-records';
import AIOptions from './AI-Toolkit/ai-options';
import AIToolkit from './AI-Toolkit/AIToolkit';
import MarkdownDemo from './not-using';
import AppAccordion from './components/manuscript/introduction/accordion';
import GenerateIntroduction from './components/manuscript/introduction/generate-introduction';

function App() {
  const isLoggedin = useSelector((state:any) => state.reducer.auth.isAuth);
  const location = useLocation(); 
  
  // Check for login or sign-up related pages
  const isLoginOrSignUpPage = ['/login', '/signup', '/activate', '/forgot-password', '/reset-password', '/seller-signUp']
    .some(path => location.pathname === path || location.pathname.includes(path));
  const variables = [
    {
      id: 1,
      name: 'Age(Numeric)',
      type: "Numeric"
    },

    {
      id: 2,
      name: 'Grade(Numeric)',
      type: "Numeric"
    },

    {
      id: 3,
      name: 'BMI(categorical)',
      type: "Categorical"
    },

    {
      id: 4,
      name: 'hours_of_study(Numeric)',
      type: "Numeric"
    },

    {
      id: 5,
      name: 'survey_details(String)',
      type: "String"
    },

  ]
  // npm run lint -- --fix

  // const apiResponse = {
    
  //     "data": {
  //         "suggestedResponses": "**Participant Consent Form**\n\nYou are being invited to participate in the study titled \"Exploring Health and Fitness Trends in the Modern Age\", which is being conducted by John Doe and is sponsored by XYZ Inc.. The purpose of this project is to analyze the health and fitness trends in the modern age. The information collected will be used to analyze health and fitness trends.\n\n**Introduction**\n\nThe purpose of this form is to provide information about the study and to obtain your consent to participate. Please read the following information carefully before making a decision. If you have any questions, please contact the principal investigator at femba01@live.com or [insert contact information].\n\n**Study Details**\n\nThe study involves participating in a survey that will take approximately 10 minutes to complete, including time to answer screening questions.\n\n**Risks and Benefits**\n\nThere are no anticipated risks associated with this study. The benefits include contributing to the understanding of health and fitness trends in the modern age.\n\n**Confidentiality**\n\nYour responses will be kept confidential and will not be shared with anyone outside of the research team. All data will be stored securely and will only be accessible to the research team.\n\n**Voluntary Participation**\n\nParticipation in this study is voluntary and you may withdraw at any time without penalty. Your decision to participate or not will not affect your relationship with the researchers or XYZ Inc.\n\n**Informed Consent**\n\nBy continuing with this study, you confirm that you have read and understood the information provided and agree to participate.\n\n**Signature**\n\nBy signing below, you acknowledge that you have read and understood the information provided and voluntarily consent to participate in the study.\n\nParticipant Signature:______________\n\nDate:______________",
  //         "requestId": "2e31aaa9-698e-4738-b126-447934ca932a"
  //     },
  //     "status": true,
  //     "message": "Consent form generated successfully",
  //     "code": 200
  
  // };


//   const apiResponse = {
    
//     "data": {
//         "suggestedResponses": "{\"Background\":\"BACKGROUND: /n/n**Overview and Background: Testing a New Proposal**\\nTobacco use continues to be a major public health concern,SLT.\",\"SpecificAims\":\"SPECIFC AIMS: /n/n**Research Question:**\\nWhat is the association between social media usage and mental health outcomes among college students?\\n\\n**Aim 1: Investigate the impact of social media usage on mental health outcomes among college students.**\\n**Objectives:**\\n- Objective 1: Determine the frequency and duration of social media usage among college students.\\n- Objective 2: Examine the relationship between social media usage and symptoms of anxiety and depression in college students.\\n- Objective 3 (optional): Investigate the potential moderating effect of demographic variables on the relationship between social media usage and mental health outcomes.\\n\\n**Hypothesis 1: Increased social media usage is associated with higher levels of anxiety and depression symptoms among college students.**\\n\\n**Aim 2: Explore the role of social media comparison on mental health outcomes among college students.**\\n**Objectives:**\\n- Objective 1: Measure the degree of social media comparison among college students.\\n- Objective 2: Examine the relationship between social media comparison and self-esteem and body image dissatisfaction among college students.\\n- Objective 3 (optional): Investigate the potential moderating effect of gender on the relationship between social media comparison and mental health outcomes.\\n\\n**Hypothesis 2: Higher levels of social media comparison are associated with lower levels of self-esteem and higher\",\"Significance\":\"SIGNIFICANCE: /n/n**Importance of Addressing the Research Problem and Potential Impact on the Field**\\n\\nThe research problem being addressed in this study is of critical importance in the relevant field.\",\"Innovation\":\"INNOVATION: something here.\",\"Approach\":\"APPROACH: /n/n**Overarching Study Design**\\n\\nFor this proposed\",\"AimSpecificMethodology\":Aim-Specific Methodology: /n/n**Aim 1: Investigating\",\"StrengthsWeaknessesChallenges\":STRENGTHS-CHALLENGES-SOLUTIONS: do something here\",\"ResearchTeam\":\"INVESTIGATORS: /n/n**Research Team**\\n\\nThe research team for this proposed study consists of highly qualified individuals who possess a diverse range of expertise and experience in the field of [insert field of study]. Together, they bring a unique set of skills and knowledge to successfully carry out the proposed research.\\n\\n1.\",\"DisseminationActivitiesAndFutureDirection\":DISSEMINATION OF FINDINGS AND FUTURE DIRECTIONS: do something here\",\"Timetable\":null,\"Budget\":\"STUDY BUDGET: /n/n**Personnel Justification:**\\n- The team members involved in this project play crucial roles in ensuring its success. Each member brings in a unique set of skills and expertise that are necessary for the completion of the project. \\n- The project lead, Dr. X,\",\"References\":\"REFERENCES: **Introduction\\n\\nThe proposed project aims to develop a new software application that will assist small businesses in managing their finances and inventory. The software will be user-friendly and customizable to fit the specific needs of each business. This proposal will outline the details of the project, including the objectives, scope, timeline, budget, and necessary resources.\\n\\n**Objectives\\n\\nThe\",\"ProjectTitle\":ProjectTitle: **Testing tobacco\"}",
//         "requestId": "2e31aaa9-698e-4738-b126-447934ca932a"
//     },
//     "status": true,
//     "message": "Consent form generated successfully",
//     "code": 200

// };
  // setResponse(apiResponse.data.suggestedResponses);


  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className='w-full overflow-hidden'>
        <ToastContainer />
        <Navbar />
        {/* <Preview /> */}
        {/* <RenameDataset initialDatasetName='Age'/>
        <RespecifyVariable variables={variables}/>
        <RespecifyDatasetMultiple variables={variables} />
        <CloneVariable variables={variables} />
        <RenameVariable initialVariableName='Age' />
        <DeleteVariable variables={variables} />
        <Relabel variables={variables}/>
        <DeleteRecords variables={variables}/> */}
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {apiResponse.data.suggestedResponses}
        </ReactMarkdown> */}
        {/* <AIToolkit /> */}
        {/* <MarkdownDemo /> */}
        <GenerateIntroduction />
          <Suspense fallback={<Spinner size={16} color="text-blue-500" />}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        {!isLoginOrSignUpPage && <Footer />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
