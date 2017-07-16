import {renderComponent, expect} from '../test_helper';

import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {

  let component;

  beforeEach(() => {
    const props = {
      comments: ['new1', 'new2', 'new3']
    };
    component = renderComponent(CommentList, null, props);
  });

  it('shows an LI for each comment', () => {
    expect(component.find('li').length).to.equal(3);
  });

  it('shows each comment that is provided', () => {
    expect(component).to.contain('new1');
    expect(component).to.contain('new2');
    expect(component).to.contain('new3');
  });

});
