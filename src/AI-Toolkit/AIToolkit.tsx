import React from 'react'
import AIOptions from './ai-options'
import EmptyStateHistory from './empty-state-history'
import SuggesterHistory from './suggester-history'
import AIToolkitModal from './AIToolkit-modals/AIToolkit-modal'

const AIToolkit = () => {
    const [ viewHistory, setViewHistory ] = React.useState(false)
    const [activeForm, setActiveForm] = React.useState('')
    const [openModal, setOpenModal] = React.useState(false)

    const toggleModalViews = (value: string) => {
        setOpenModal(true)
        switch (value) {
            case 'AI Journal Suggester':
                setActiveForm('AI Journal Suggester')
                break;
            case 'AI Collaboration Connector':
                setActiveForm('AI Collaboration Connector')
                break;
            case 'AI Research Question Generator':
                setActiveForm('AI Research Question Generator')
                break;
            case 'AI Research Proposal Builder':
                setActiveForm('AI Research Proposal Builder')
                break;
            case 'AI Journal Cover Letter Writer':
                setActiveForm('AI Journal Cover Letter Writer')
                break;
            case 'AI Consent Form Generator':
                setActiveForm('AI Consent Form Generator')
                break;
            default:
                break;
        }
    }

    const closeModal = () => {
        setOpenModal(false)
        setActiveForm('')
    }

  return (
    <>
    {/* { viewHistory ? <EmptyStateHistory /> : <AIOptions setViewHistory={setViewHistory}/>} */}
    { viewHistory ? 
    <SuggesterHistory 
    activeForm={activeForm} 
    setActiveForm={setActiveForm}
    openModal={openModal}
    setOpenModal={setOpenModal}
    toggleModalViews={toggleModalViews}
    />
     : 
     <AIOptions 
     setViewHistory={setViewHistory}
      activeForm={activeForm} 
      setActiveForm={setActiveForm}
      openModal={openModal}
      setOpenModal={setOpenModal}
      toggleModalViews={toggleModalViews}
      />}
      <AIToolkitModal
      activeForm={activeForm}
      openModal={openModal}
      closeModal={closeModal}
      setActiveForm={setActiveForm}
      setOpenModal={setOpenModal}
      />
    </>
  )
}

export default AIToolkit