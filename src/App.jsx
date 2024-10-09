import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, {jobLoader} from './pages/JobPage'
import JobAddPage from './pages/JobAddPage'
import EditJobPage from './pages/EditJobPage'

const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
    return
  }

  // Delete job
  const deleteJob = async(id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    }) 
    return
  }

    // Update job
    const updateJobSubmit = async (job) => {
      
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
      })

      return
    }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<JobAddPage addJobSubmit={addJob}/>}  />
        <Route 
          path='/jobs/edit/:id' 
          element={<EditJobPage updateJobSubmit={updateJobSubmit}/>} 
          loader={jobLoader} />
        <Route 
          path='/job/:id' 
          element={<JobPage deleteJob={deleteJob} />} 
          loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App