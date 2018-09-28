import SimpleMDE from 'react-simplemde-editor'
import CrewPortForm from '../components/forms/CrewPortForm'
let FormMapping = {}
FormMapping.news = SimpleMDE
FormMapping.beauty = SimpleMDE
FormMapping.crew_hotel = CrewPortForm
FormMapping.crew_shopping = CrewPortForm
FormMapping.crew_place = CrewPortForm
FormMapping.crew_restaurant = CrewPortForm
FormMapping.port_guide_article = SimpleMDE
FormMapping.articles = SimpleMDE
FormMapping.people = SimpleMDE
FormMapping.market = SimpleMDE

FormMapping.loadForm = page => {
  let ipage = FormMapping[page]
  if (!ipage) {
    return SimpleMDE
  } else {
    return ipage
  }
}
FormMapping.FORMCODES = [
  { label: 'Crew Mobile News', value: 'news' },
  { label: 'Crew Mobile Beauty', value: 'beauty' },
  { label: 'Crew Hotel', value: 'crew_hotel' },
  { label: 'Crew Place', value: 'crew_place' },
  { label: 'Crew Restaurant', value: 'crew_restaurant' },
  { label: 'Crew Shopping', value: 'crew_shopping' },
  { label: 'Port Guide Article', value: 'port_guide_article' },
  { label: 'MOL Home Articles', value: 'articles' },
  { label: 'MOL Home People', value: 'people' },
  { label: 'MOL Home Market', value: 'market' }
]
export default FormMapping
