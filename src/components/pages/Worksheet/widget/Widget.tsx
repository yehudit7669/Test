import MultipleChoice from './MultipleChoice'
import OpenQuestion from './OpenQuestion'
import WordSearchPuzzle from './WordSearchPuzzle'
import BlanksWidget from './common/blanks'
import DiscussionsWidget from './common/discussions'
import EmbedWidget from './common/embed'
import ImageWidget from './common/image'
import LinkWidget from './common/link'
import Reflection from './common/reflection'
import TableWidget from './common/table'
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
  image: 'Image',
  table: 'Table',
}

const Widget = ({ widget }: any) => {
  // console.log(widget.name)
  switch (widget.name) {
    case widgetTypes.openQuestion:
      return <OpenQuestion data={widget.data} />
    case widgetTypes.multipleChoice:
      return <MultipleChoice data={widget.data} />
    case widgetTypes.link:
      return <LinkWidget data={widget.data} />
    case widgetTypes.wordPuzzle:
      return <WordSearchPuzzle data={widget.data} />
    case widgetTypes.video:
      return <Video data={widget.data} />
    case widgetTypes.embed:
      return <EmbedWidget data={widget.data} />
    case widgetTypes.text:
      return <TextWidget data={widget.data} />
    case widgetTypes.image:
      return <ImageWidget data={widget.data} />
    case widgetTypes.reflection:
      return <Reflection data={widget.data} />
    case widgetTypes.blanks:
      return <BlanksWidget data={widget.data} />
    case widgetTypes.table:
      return <TableWidget data={widget.data} />
    case widgetTypes.discussion:
      return <DiscussionsWidget data={widget.data} />
    default:
      return <h1>Component not found!! Type : {widget?.name}</h1>
  }
}

export default Widget
