import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'

class CategoryList extends Component {
  render() {
    return (
      <Grid columns='equal'>
        <Grid.Column>
        <Link to="/">
          <Segment>
            All Posts
          </Segment>
        </Link>
        </Grid.Column>
      {
        this.props.categories.map((category) => (
          <Grid.Column key={category.name}>
            <Link to={"/" + category.name}>
              <Segment>
                {category.name}
              </Segment>
            </Link>            
          </Grid.Column>
        ))
      }
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return state.categories;
}

export default connect(mapStateToProps)(CategoryList);
