import MultipleChoice from './MultipleChoice'
import OpenQuestion from './OpenQuestion'

const widgetTypes = {
  openQuestion: 'Open Question',
  multipleChoice: 'Multiple Choice',
}

const Widget = ({ widget }: any) => {
  switch (widget.name) {
    case widgetTypes.openQuestion:
      return <OpenQuestion data={widget.data} />
    case widgetTypes.multipleChoice:
      return <MultipleChoice data={widget.data} />
    default:
      return null
  }
}

export default Widget
