import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap'

class LoginForm extends React.Component {
    render(){
        return(
            <form class="text-center border border-5 rounded rounded-5 p-5 bg-light">
                <h1>Connecez-vous</h1>
                <div className='py-4'>
                    <label className='fs-4'>Nom d'utilisateur</label>
                    <input type="text" class="form-control" id="username" />
                </div>
                <div className='py-4'>
                    <label className='fs-4'>Mot de passe</label>
                    <input type="password" class="form-control" id="password" />
                </div>
                <button type='button' className='btn btn-primary fs-4'>Se connecter</button>
            </form>
        );
        
    }
}

class SignInForm extends React.Component {
    render(){
        return(
            <form class="text-center border border-5 rounded rounded-5 p-5 bg-light">
                <h1>Inscrivez-vous</h1>
                <div className='py-4'>
                    <label className='fs-4' >Nom d'utilisateur</label>
                    <input type="text" class="form-control" id="username" />
                </div>
                <div className='py-4'>
                    <label className='fs-4'>E-mail</label>
                    <input type="text" class="form-control" id="username" />
                </div>
                <div className='py-4'>
                    <label className='fs-4'>Mot de passe</label>
                    <input type="password" class="form-control" id="password" />
                </div>
                <div className='py-4'>
                    <label className='fs-4'>Validez le mot de passe</label>
                    <input type="password" class="form-control" id="password2" />
                </div>
                <button type='button' className='btn btn-primary fs-4'>Se connecter</button>
            </form>
        )
    }
}

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active:true
        }
    }

    ActivateForm(){
        this.setState({active:!this.state.active})
        console.log("click")
    }

    render(){
        const isActive = this.state.active
        let form
        let element
        var Background = {
            backgroundImage:"url(/Background.jpg)",
            backgroundSize:"cover"
        }
        if(isActive){
            form = <LoginForm/>
            element= <p className='text-center fs-4'> Pas encore de compte ? <span onClick={()=>{this.ActivateForm()}}>Inscrivez-vous !</span></p>
        }
        else{
            form = <SignInForm/>
            element= <p className='text-center fs-4'> Vous avez déjà un compte ? <span onClick={()=>{this.ActivateForm()}}>Connectez-vous !</span></p>
        }
        return(
            <div style={Background}>
                <div className='container-fluid mx-auto p-5 m-5'>
                    <div className='row'>
                        <div className='col-lg-6 my-auto text-center'>
                            <h1 style={{fontSize:100}}>Faminder</h1>
                            <h2>Prevoyez, organisez, ensemble</h2>
                        </div>
                        <div className='col-lg-6 my-auto'>
                            {form}
                            {element}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home