import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { axisCoordinates, HORIZONTAL, TOP, LEFT } from '@devexpress/dx-chart-core';

export class Grid extends React.PureComponent {
  render() {
    const {
      name,
      lineComponent: Line,
      ...restProps
    } = this.props;
    return (
      <Plugin name="Grid">
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              domains,
              layouts,
            }) => {
              const domain = domains[name];
              const { orientation } = domain;
              const {
                width, height,
              } = layouts.pane;

              const coordinates = axisCoordinates(
                domain,
                orientation === HORIZONTAL ? TOP : LEFT,
                width,
                height,
                0,
              );

              return ((
                <React.Fragment>
                  {coordinates.ticks.map(({
                      x1, x2, y1, y2, text,
                    }) => (
                      <Line
                        key={text}
                        x1={orientation === 'horizontal' ? x1 : width}
                        x2={x2}
                        y1={orientation === 'horizontal' ? height : y1}
                        y2={y2}
                        {...restProps}
                      />
                    ))}
                </React.Fragment>
              ));
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Grid.propTypes = {
  name: PropTypes.string,
  lineComponent: PropTypes.func.isRequired,
};

Grid.defaultProps = {
  name: undefined,
};
