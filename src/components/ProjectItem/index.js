import {ListCont, ProjectImg, Para} from './styledComponents'

const ProjectItem = props => {
  const {projectDetails} = props
  const {id, name, imageUrl} = projectDetails

  return (
    <ListCont>
      <ProjectImg src={imageUrl} alt={name} />
      <Para>{name}</Para>
    </ListCont>
  )
}

export default ProjectItem
