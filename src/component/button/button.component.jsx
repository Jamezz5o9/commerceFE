import "./button.styles.scss"

const BUTTON_TYPPE_CLASSES = {
    google : "google-sign-in",
    inverted: "inverted",
}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
       <button className= {`button-container ${BUTTON_TYPPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
    )
}

export default Button   