import styled from '@emotion/styled';
import { Flex } from '../../../components/FlexGrid';
import { gray } from '../../../components/variables';
import { margin, rounded } from '../../../components/utilities';

function DetailSectionTemplate ({ className, title, children }) {
  return (
    <Flex as="section" column alignItems="center" className={className}>
      <h2>{title}</h2>
      {children}
    </Flex>
  );
}

const DetailSection = styled(DetailSectionTemplate)`
  border: 1px solid ${gray};

  ${margin.t4}
  ${rounded}
  h2 {
    font-size: 1.25rem;
    display: inline-block;
    margin-top: -0.75rem;
    background: white;
    border: 1rem solid white;
    border-top: none;
    border-bottom: none;
  }
`;

export default DetailSection;
