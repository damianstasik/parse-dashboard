/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import Popover  from 'components/Popover/Popover.react';
import React    from 'react';
import styles   from 'components/SuggestionsList/SuggestionsList.scss';
import Position from 'lib/Position';

interface Props {
  position: Position;
  onExternalClick: (e: any) => void;
  suggestions: any[];
  suggestionsStyle: any;
  activeSuggestion: number;
  onClick: (e: any) => void;
}

interface State {
  activeSuggestion: number;
  open: boolean;
  position: Position | null;
}

export default class Suggestion extends React.Component<Props, State> {
  popoverRef = React.createRef<Popover>();

  constructor(props: Props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      open: false,
      position: null
    };
  }

  setPosition(position: Position) {
   this.popoverRef.current && this.popoverRef.current.setPosition(position);
  }

  close() {
    this.setState({ open: false });
  }

  render() {
  const { 
    position,
    onExternalClick,
    suggestions,
    suggestionsStyle,
    activeSuggestion,
    onClick} = this.props;

    return (
      <Popover
      fixed={false}
      position={position}
      ref={this.popoverRef}
      onExternalClick={onExternalClick}
    >
      <ul style={suggestionsStyle} className={styles.suggestions}>
        {suggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestion) {
            className = styles.active;
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    </Popover>
    );
  }
}
