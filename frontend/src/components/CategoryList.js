import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'

class CategoryList extends Component {
  render() {
    return (      
      <Grid columns='equal'>
        <Grid.Column>
        <Segment>
          <Link to="/">All Posts</Link>
        </Segment>
        </Grid.Column>
      {
        this.props.categories.map((category) => (
          <Grid.Column key={category.name}>
            <Segment>
              <Link
              to={"/" + category.name}
              >
                {category.name}
              </Link>
            </Segment>
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
