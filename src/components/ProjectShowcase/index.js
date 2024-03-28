import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  BgCont,
  Cont,
  Input,
  UlCont,
  FailureCont,
  FilureImg,
  Heading,
  Button,
} from './styledComponents'
import Header from '../Header'
import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const activeApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class ProjectShowcase extends Component {
  state = {
    projectList: [],
    apiStatus: activeApiStatusConstants.initial,
    category: categoriesList[0].id,
  }

  componentDidMount() {
    this.getProjectList()
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value}, this.getProjectList)
  }

  onClickRetry = () => {
    this.getProjectList()
  }

  onSuccessfulResponse = projectList => {
    this.setState({projectList, apiStatus: activeApiStatusConstants.success})
  }

  onFailureResponse = () => {
    this.setState({apiStatus: activeApiStatusConstants.failure})
  }

  getProjectList = async () => {
    this.setState({apiStatus: activeApiStatusConstants.loading})

    const {category} = this.state

    const url = `https://apis.ccbp.in/ps/projects?category=${category}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const formatedProjectList = data.projects.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))

      this.onSuccessfulResponse(formatedProjectList)
    } else {
      this.onFailureResponse()
    }
  }

  renderSuccessView = () => {
    const {projectList} = this.state

    return (
      <UlCont>
        {projectList.map(eachItem => (
          <ProjectItem projectDetails={eachItem} key={eachItem.id} />
        ))}
      </UlCont>
    )
  }

  renderLoadingView = () => (
    <FailureCont data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" width={50} height={50} />
    </FailureCont>
  )

  renderFailureView = () => (
    <FailureCont>
      <FilureImg
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Heading as="p" para>
        We cannot seem to find the page you are looking for.
      </Heading>
      <Button type="button" onClick={this.onClickRetry}>
        Retry
      </Button>
    </FailureCont>
  )

  render() {
    const {projectList, apiStatus, category} = this.state

    const renderActiveView = () => {
      switch (apiStatus) {
        case activeApiStatusConstants.success:
          return this.renderSuccessView()
        case activeApiStatusConstants.loading:
          return this.renderLoadingView()
        case activeApiStatusConstants.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    return (
      <BgCont>
        <Header />
        <Cont>
          <Input
            value={category}
            type="select"
            onChange={this.onChangeCategory}
          >
            {categoriesList.map(eachItem => (
              <option value={eachItem.id} key={eachItem.id}>
                {eachItem.displayText}
              </option>
            ))}
          </Input>
          {renderActiveView()}
        </Cont>
      </BgCont>
    )
  }
}

export default ProjectShowcase
