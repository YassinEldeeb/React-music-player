import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const SwitchTheme = ({ theme, setTheme }) => {
  const switchTheme = () => {
    if (theme === "Dark") {
      setTheme("Light")
    } else {
      setTheme("Dark")
    }
    localStorage.setItem("theme", theme === "Dark" ? "Light" : "Dark")
  }

  return (
    <div className='changeTheme'>
      <span style={{ color: theme === "Light" ? "black" : "white" }}>
        {theme}
      </span>
      <div
        onClick={switchTheme}
        className='switchDiv'
        style={{ background: theme === "Light" ? "#edc22b" : "#2f2f2f" }}
      >
        <FontAwesomeIcon
          style={{
            width: "28px",
            height: "28px",
            color: "white",
            display: theme === "Light" ? "none" : "block",
          }}
          size='2x'
          icon={faMoon}
        />
        <div className='Switchcircle'></div>
        <FontAwesomeIcon
          style={{
            width: "28px",
            height: "28px",
            color: "white",
            display: theme === "Light" ? "block" : "none",
          }}
          id='sun-SVG'
          size='2x'
          icon={faSun}
        />
      </div>
    </div>
  )
}
export default SwitchTheme
