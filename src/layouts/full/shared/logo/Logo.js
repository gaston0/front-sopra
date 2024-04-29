import { Link } from 'react-router-dom';
import { ReactComponent as LogoSopra } from 'src/assets/images/logos/sopra (2).svg';


import { styled } from '@mui/material';
import { blue } from '@mui/material/colors';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
  color: blue
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <LogoSopra height={70} />
    </LinkStyled>
  )
};

export default Logo;
