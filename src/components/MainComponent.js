import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent'; //MainComponent becomes responsible for both the Menu and Dishdetail
import Home from './HomeComponent';
import Gallery from './GalleryComponent';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators'; // we need this function to obtain an action, then we can dispatch to the store
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {GALLERY} from '../shared/gallery';


//this will map the redux store state into props that will become available to the components
const mapStateToProps = state => {

  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders

  }
    
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)), //action object is given as a parameter to the dispatch function, and it assign that to another function
  postFeedback: (firstName, lastName, telnum, email, agree, contactType, message) =>dispatch(postFeedback(firstName, lastName, telnum, email, agree, contactType, message)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {
  //in order to store the state, you need to define the state in the constructor of the class component
  constructor(props){
    super(props);
    this.state = {
      gallery: GALLERY
    };
    

  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }




  render() {

    const GalleryPage = () =>{
      return(
        <Gallery gallery={this.state.gallery}></Gallery>
      );
    }

    const HomePage = () => {
      return(
         <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
         dishesLoading = {this.props.dishes.isLoading}
         dishesErrMess = {this.props.dishes.errMess}
         promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
         promoLoading = {this.props.promotions.isLoading}
         promoErrMess = {this.props.promotions.errMess}
         leader={this.props.leaders.leaders.filter((ld) => ld.featured)[0]}
         leadersLoading = {this.props.leaders.isLoading}
         leadersErrMess = {this.props.leaders.errMess}
         /> //select the featured dish
         
      )
    }

      const DishWithId = ({match}) => {
        return(
          <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading = {this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess}
             comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
             CommentsErrMess = {this.props.comments.errMess}
             postComment = {this.props.postComment}
             />
             //postComment function is also passed to the Dishdetail component as an attribute, so we can use it in Dishdetail
         )
      

      }

    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>

              <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}></Contact>}/>
                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                <Route exact path="/gallery" component={GalleryPage}/>
                
              </Switch>
            </CSSTransition>
        </TransitionGroup>

        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));


