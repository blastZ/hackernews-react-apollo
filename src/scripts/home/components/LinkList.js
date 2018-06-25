import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LinkList extends Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });
    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  }

  render() {
    const { linkList } = this.props;
    if(linkList && linkList.loading) {
      return <div>Loading...</div>
    }
    if(linkList && linkList.error) {
      return <div>{linkList.error}</div>
    }
    const linksToRender = linkList.feed.links;

    return (
      <div>{linksToRender.map((link, index) => <Link
        updateStoreAfterVote={this._updateCacheAfterVote}
        index={index} key={link.id} link={link} />)}</div>
    )
  }
}

export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        votes {
          id
        }
        postedBy {
          id
          name
        }
        createdAt
        description
        url
      }
    }
  }
`;

export default graphql(FEED_QUERY, { name: 'linkList' })(LinkList)