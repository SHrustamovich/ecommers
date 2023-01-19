import * as React from "react"
import { SVGProps } from "react"

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={49}
    height={41}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.3}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.9 15.9 24.041 1.756a6 6 0 0 1 8.485 0L46.669 15.9a6 6 0 0 1 0 8.485L32.527 38.527a6 6 0 0 1-8.485 0L9.899 24.385a6 6 0 0 1 0-8.486Z"
      fill="#3167EB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.615 15.9 16.757 1.756a6 6 0 0 1 8.486 0L39.385 15.9a6 6 0 0 1 0 8.485L25.243 38.527a6 6 0 0 1-8.486 0L2.615 24.385a6 6 0 0 1 0-8.486Z"
      fill="#3167EB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.697 14.339a3.38 3.38 0 0 1 4.777-.001l.478-.476a1.458 1.458 0 0 1 1.969-.063l6.098 5.38c.559.494.586 1.32.059 1.847l-6.694 6.694c-.527.526-1.354.5-1.847-.06l-5.38-6.097a1.456 1.456 0 0 1 .063-1.97l.477-.476a3.38 3.38 0 0 1 0-4.778Zm3.822.955a2.028 2.028 0 0 0-2.867 0 2.028 2.028 0 0 0 0 2.866l2.867-2.866Zm-2.867 4.779-.476.476c-.025.025-.027.096-.006.12l5.326 6.028 6.56-6.564-6.03-5.32c-.023-.021-.095-.019-.119.005l-.477.476-.955.956-2.867 2.867-.956.956Z"
      fill="#fff"
    />
  </svg>
)

export default Logo