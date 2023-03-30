import { motion, useAnimation, useScroll } from "framer-motion";
import {
  Link,
  NavigateFunction,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCaretUp} from "@fortawesome/free-solid-svg-icons";
import { authService, firebaseInstance } from "../Fbase/fbase";



const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 3.6458vw;
  z-index: 998; // z-index: 999 : modal
  height: 10%;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${props => props.theme.red};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  font-weight: 500;
  margin-right: 20px;
  font-size: 15;
  color: ${props => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${props => props.theme.white.lighter};
  }
`;

const ItemCircle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: ${props => props.theme.red};
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
    padding-right: 10px;
  }
  :hover{
    cursor: pointer;
  }
 
`;

const Input = styled(motion.input)`
  width: 250px;
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 14px;
  background-color: rgba(20, 20, 20, 0.9);
  border: 1px solid ${props => props.theme.white.lighter};
  @media (max-width: 768px) {
    max-width: 100px;
  }
`;
const Myinfo = styled(motion.div)`
  width: 50px;
  padding: 10px;
  padding-right: 0;
  color: white;
  z-index: 999;
  font-size: 25px;
  text-align: right;
  :hover{
    cursor: pointer;
  }
`
const Myinfo2 = styled(motion.div)`
  width: 200px;
  height: 100px;
  background-color: black;
  position: absolute;
  top: 77px;
  right: 3.6458vw;
  border: 1px solid black;
  border-radius: 15px;
  z-index: 9999;
  padding: 10px;
  :hover{
    cursor: pointer;
  }
  
`
const Myinfo3 = styled.div`
  padding: 10px;
  // 글자수 초과시 ...  표시
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  :hover{
    line-decoration: underline;
  }

`
//---------Variants

const navVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(20,20,20,1)",
  },
};

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0.1, 1, 0.1],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};
const myinfovariants = {
  start: {
    opacity: 0,
    y: -20,
  },
  end: {
    opacity: 1,
    y: 0
  }
}
//---------Interface
interface IForm {
  keyword: string;
}

function Header({userObj}:any) {
  // 현재 URL 위치 확인
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("tv");
  const searchMatch = useMatch("search");

  // 검색 아이콘 클릭 여부 확인
  const [searchOpen, setSearchOpen] = useState(false);
 

  // NAV 애니메이션을 위한 스크롤 감지
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 50) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  // 검색 기능
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const navigate: NavigateFunction = useNavigate();
  const onValid = ({ keyword }: IForm) => {
    navigate(`/search?keyword=${keyword}`);
    setValue("keyword", "");
  };

  // 검색창 오픈 여부에 따른 애니메이션
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen(prev => !prev);
  };
  // 내정보 오픈 여부의 애니메이션
  const [myinfoOpen, setMyinfoOpen] = useState(false);

  const toggleMyinfo = () => {
    setMyinfoOpen(prev => !prev);
  };
  const clickLogout = () => {
    authService.signOut();
  }
  

  return (
    <>
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Column>
        <Link to={"/"}>
          <Logo
            variants={logoVariants}
            initial="normal"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to="/">
              Home {homeMatch && <ItemCircle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="tv">
              Series {tvMatch && <ItemCircle layoutId="circle" />}
            </Link>
          </Item>
          
          <Item>
            <Link to="search">
              Search {searchMatch && <ItemCircle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Column>
      <Column>
      {window.innerWidth > 768 ?
        <>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -200 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Title, Person, Genre"
            {...register("keyword", { required: true, minLength: 2 })}
          />
        </Search>
        </>
        :null}
        <Myinfo onClick={toggleMyinfo}>
          {myinfoOpen ? 
          <FontAwesomeIcon icon={faSquareCaretUp} /> : 
          <FontAwesomeIcon icon={faSquareCaretUp} rotation={180} />}
        </Myinfo>
        {myinfoOpen? <Myinfo2
        variants={myinfovariants}
        initial="start"
        animate="end"
        transition={{
          type: "linear",
        }}
        >
          {authService.currentUser?.displayName !== null && undefined ? <Myinfo3>{authService.currentUser?.displayName}님 환영합니다</Myinfo3> : <Myinfo3 >{authService.currentUser?.email}</Myinfo3>}
          <Link to={"/"}>
            <Myinfo3 onClick={clickLogout}>로그아웃</Myinfo3>
          </Link>
        </Myinfo2> : null}
      </Column>
    </Nav>
    </>
  );
  
}

export default Header;