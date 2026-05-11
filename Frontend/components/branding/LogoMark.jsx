import { Link } from 'react-router-dom';

function LogoMark({ to = '/', compact = false }) {
  const className = compact ? 'logo-mark logo-mark--compact' : 'logo-mark';

  return (
    <Link className={className} to={to} aria-label="Data Diet home">
      <span className="logo-mark__badge" aria-hidden="true">
        DD
      </span>
      {!compact ? <span className="logo-mark__text">Data Diet</span> : null}
    </Link>
  );
}

export default LogoMark;
