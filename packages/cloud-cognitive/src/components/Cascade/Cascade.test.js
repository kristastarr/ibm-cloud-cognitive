//
// Copyright IBM Corp. 20201, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { render, screen } from '@testing-library/react';
import React from 'react';
import { pkg } from '../../settings';
const { devtoolsAttribute, getDevtoolsId, prefix } = pkg;
import { Cascade } from '.';

const blockClass = `${prefix}--cascade`;
const componentName = Cascade.displayName;

describe(componentName, () => {
  it('renders without grid', () => {
    const { container } = render(
      <Cascade>
        <div>card 1</div>
        <div>card 2</div>
        <div>card 3</div>
        <div>card 4</div>
      </Cascade>
    );
    expect(container.querySelector(`.${blockClass}`)).toBeVisible();
    expect(container.querySelectorAll(`.${blockClass}__element`)).toHaveLength(
      4
    );
  });

  it('renders with grid', () => {
    const { container } = render(
      <Cascade grid>
        <div className="row">
          <div>card 1</div>
          <div>card 2</div>
        </div>
        <div className="row">
          <div>card 3</div>
          <div>card 4</div>
        </div>
      </Cascade>
    );
    expect(container.querySelector(`.${blockClass}`)).toBeVisible();
    expect(container.querySelectorAll(`.${blockClass}__col`)).toHaveLength(4);
    expect(container.querySelector(`.${blockClass}__col-1`)).toBeVisible();
    expect(container.querySelector(`.${blockClass}__col-2`)).toBeVisible();
    expect(container.querySelector(`.${blockClass}__col-3`)).toBeVisible();
    expect(container.querySelector(`.${blockClass}__col-4`)).toBeVisible();
  });

  it('renders with grid but no columns', () => {
    const { container } = render(
      <Cascade grid>
        <div className="row" />
      </Cascade>
    );
    expect(container.querySelector(`.${blockClass}`)).toBeVisible();
    expect(container.querySelectorAll(`.${blockClass}__col`)).toHaveLength(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Cascade />);
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', () => {
    const className = 'test-class';
    const { container } = render(<Cascade className={className} />);
    expect(container.firstChild).toHaveClass(className);
  });

  it('adds additional properties to the containing node', () => {
    render(<Cascade data-testid="test-id" />);
    screen.getByTestId('test-id');
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(<Cascade ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', () => {
    render(<Cascade data-testid="test-id" />);
    expect(screen.getByTestId('test-id')).toHaveAttribute(
      devtoolsAttribute,
      getDevtoolsId(componentName)
    );
  });
});
