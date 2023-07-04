import MultipleChoice from './MultipleChoice'
import OpenQuestion from './OpenQuestion'
import EmbedWidget from './common/embed'
import LinkWidget from './common/link'
import TextWidget from './common/text'
import Video from './common/video'

const widgetTypes = {
  openQuestion: 'Open Question',
  multipleChoice: 'Multiple Choice',
  content: 'content',
  question: 'question',
  video: 'Video',
  matching: 'Matching',
  sorting: 'Sorting',
  blanks: 'Blanks',
  link: 'Link',
  embed: 'Embed',
  discussion: 'Discussion',
  reflection: 'Reflection',
  wordPuzzle: 'Word Search Puzzle',
  fillOnAnImage: 'Fill On An Image',
  text: 'Text',
}

const Widget = ({ widget }: any) => {
  console.log(widget)
  switch (widget.name) {
    case widgetTypes.openQuestion:
      return <OpenQuestion data={widget.data} />
    case widgetTypes.multipleChoice:
      return <MultipleChoice data={widget.data} />
    case widgetTypes.link:
      return <LinkWidget data={widget.data} />
    case widgetTypes.video:
      return <Video data={widget.data} />
    case widgetTypes.embed:
      return <EmbedWidget data={widget.data} />
    case widgetTypes.text:
      return <TextWidget data={widget.data} />
    default:
      return <h1>Component not found!! Type : {widget?.name}</h1>
  }
}

export default Widget
