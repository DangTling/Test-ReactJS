import Alert from "react-bootstrap/Alert";

function NotFound() {
  return (
    <Alert variant="danger" className="mt-3">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>you are accessing an unknown website?</p>
    </Alert>
  );
}

export default NotFound;
