import './content.scss'

export default function Content({ children }) {
  return (
    <div id="contentOuter"><div id="contentInner">{ children }</div></div>
  )
}
