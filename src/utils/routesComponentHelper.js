import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    const location = useLocation();
    const navigate = useNavigate();
    return (
      <Children
        {...props}
        match={match}
        location={location}
        navigate={navigate}
      />
    );
  };
}
