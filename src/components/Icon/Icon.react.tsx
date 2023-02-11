/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import React     from 'react';

interface Props {
  /** The icon name. This will be the name found in the */
  name: string;

  /** The icon width, in pixels. */
  width: number;

  /** The icon height, in pixels. */
  height: number;

  /** A valid color, used as the fill property for the SVG. */
  fill?: string;
}

let Icon = (props: Props) => {
  const { name, ...rest } = props;
  return (
    <svg {...rest} >
      <use xlinkHref={`bundles/sprites.svg#${name}`} />
    </svg>
  );
};

export default Icon;

