const Loader = ({ size = 'md', className = '' }) => {
  const getSizeClass = (size) => {
    switch (size) {
      case 'xs':
        return 'w-8';
      case 'sm':
        return 'w-12';
      case 'md':
        return 'w-16';
      case 'lg':
        return 'w-20';
      default:
        return 'w-16';
    }
  };

  return (
    <div className={`${getSizeClass(size)} ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: 'auto', display: 'block', shapeRendering: 'auto' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="84" cy="50" r="10" fill="#ac38f6">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="0.42372881355932207s"
            calcMode="spline"
            keyTimes="0;1"
            values="10;0"
            keySplines="0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="discrete"
            keyTimes="0;0.25;0.5;0.75;1"
            values="#ac38f6;#00ff9d;#0086ff;#0a19a1;#ac38f6"
            begin="0s"
          ></animate>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#ac38f6">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          ></animate>
        </circle>
        <circle cx="50" cy="50" r="10" fill="#0a19a1">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.42372881355932207s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.42372881355932207s"
          ></animate>
        </circle>
        <circle cx="84" cy="50" r="10" fill="#0086ff">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.8474576271186441s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.8474576271186441s"
          ></animate>
        </circle>
        <circle cx="16" cy="50" r="10" fill="#00ff9d">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.2711864406779663s"
          ></animate>
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1.6949152542372883s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.2711864406779663s"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};
export default Loader;
