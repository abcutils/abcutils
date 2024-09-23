import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Logo } from "$src/components";
import { styled } from "styled-components";

const Header = styled.header`
  height: 100px;
  position: sticky;
  background-color: rgba(255, 255, 255, 0.771);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 0 2em;
  top: 0;
  z-index: 2;
  backdrop-filter: blur(6px);

  .logo {
    font-size: 24px;
    .img {
      display: inline-block;
      // vertical-align: middle;
      margin-right: 5px;
    }
    .utils {
      color: #4285f4;
      font-weight: 700;
      margin-left: 10px;
    }
  }
`;

const Nav = styled.nav`
  a.link {
    color: inherit;
    margin: 0 1em;
  }
  .use-now {
    margin-left: 20px;
  }
`;
// styled.css()

export default function () {
  return (
    <Header>
      <Link to="/" title="abcutils.com" className="logo">
        <Logo size="40" />
        <span className="utils">Utils</span>
      </Link>
      <Nav>
        <a href="#utils" className="link">
          工具集
        </a>
        <a href="#faqs" className="link">
          FAQs
        </a>
        <a href="#api" className="link">
          API
        </a>
        <a href="#changelog" className="link">
          更新日志
        </a>
        <Button
          variant="contained"
          component={Link}
          to="/apps/json"
          className="use-now"
        >
          在线使用
        </Button>
      </Nav>
    </Header>
  );
}
