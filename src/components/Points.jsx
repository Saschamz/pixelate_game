const Points = ({ points, title }) => {
  return (
    <div className="points-container">
      <h4 className="points">
        {points}
        <span> pts.</span>
      </h4>
      <p className="title">{title}</p>
    </div>
  )
}
export default Points
