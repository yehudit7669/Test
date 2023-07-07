import LinkWidget from './Link'
import MultipleChoice from './MultipleChoice'
import OpenQuestion from './OpenQuestion'
import WordSearchPuzzle from './WordSearchPuzzle'

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
}

const Widget = ({ widget }: any) => {
  switch (widget.name) {
    case widgetTypes.openQuestion:
      return <OpenQuestion data={widget.data} />
    case widgetTypes.multipleChoice:
      return <MultipleChoice data={widget.data} />
    case widgetTypes.link:
      return <LinkWidget data={widget.data} />
    case widgetTypes.wordPuzzle:
      return <WordSearchPuzzle data={widget.data} />
    default:
      return <h1>Component not found!!</h1>
  }
}

export default Widget
