export default (ComponentToBeRendered) => {  

  class ProtectedComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = { hola: 'HOLA' }

    }

    render() {


      if (this.state.hola) {
        return <ComponentToBeRendered {...this.props} currentUser={this.state.hola} />
      } else {
        return <Spinner fullScreen={true} />
      }

    }
  }
  return ProtectedComponent
}