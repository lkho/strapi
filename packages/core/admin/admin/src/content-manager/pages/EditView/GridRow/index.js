import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import Inputs from '../../../components/Inputs';
import FieldComponent from '../../../components/FieldComponent';

const GridRow = ({ columns }) => {
  return (
    <Grid gap={4}>
      {columns.map(({ fieldSchema, labelAction, metadatas, name, size, queryInfos }) => {
        const isComponent = fieldSchema.type === 'component';

        if (isComponent) {
          const { component, max, min, repeatable = false, required = false } = fieldSchema;

          return (
            <GridItem col={size} s={12} xs={12} key={component}>
              <FieldComponent
                componentUid={component}
                labelAction={labelAction}
                isRepeatable={repeatable}
                intlLabel={{
                  id: metadatas.label,
                  defaultMessage: metadatas.label,
                }}
                max={max}
                min={min}
                name={name}
                required={required}
              />
            </GridItem>
          );
        }

        return (
          <GridItem col={size} key={name} s={12} xs={12}>
            <Inputs
              size={size}
              fieldSchema={fieldSchema}
              keys={name}
              labelAction={labelAction}
              metadatas={metadatas}
              queryInfos={queryInfos}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

GridRow.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default GridRow;
