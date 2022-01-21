import { ReactComponent as SearchIcon } from 'app/assets/img/search.svg';
import { ReactComponent as StarIcon } from 'app/assets/img/star.svg';
import { SampleNextArrow, SamplePrevArrow } from './components/arrow';
import Header from './components/Header';
import { useState } from 'react';
import {
  Container,
  SearchBox,
  StyledSlick,
  Pair,
  Price,
  Change,
  Table,
} from './style';
import { useGlobalContext } from '../common/context';
import numeral from 'numeral';
import { isEmpty } from 'app/components/common/common';

const Market = ({ dataSocket, dataApi }) => {
  const [active, setActive] = useState('USDT');
  // const [allPair, setAllPair]: any[] = useState([]);
  let allPair: any[] = [];
  const { activeChangeColumnMarket } = useGlobalContext();

  if (dataApi.data.list && isEmpty(dataSocket)) {
    allPair = dataApi.data.list.slice(0);
  }
  if (!isEmpty(dataSocket)) {
    if (allPair.length === 0) {
      allPair = [dataSocket];
    } else {
      const index = allPair?.findIndex((item: any) => {
        return item.symbol === dataSocket?.symbol;
      });
      if (index !== -1 && allPair !== undefined) {
        // Object.assign(allPair[index], dataSocket);
        allPair[index].latestPrice = dataSocket?.latestPrice;
        allPair[index].change24h = dataSocket?.change24h;
        allPair[index].volume24h = dataSocket?.volume24h;
      }
    }
  }
  // useEffect(() => {

  // }, [dataSocket]);

  const MenuSlick = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <StyledSlick {...settings}>
        <StarIcon
          className={
            active === 'Favor' ? 'star-icon slickItem-active' : 'star-icon'
          }
          onClick={() => setActive('Favor')}
        />
        <span
          className={active === 'BUSD' ? 'slickItem-active' : ''}
          onClick={() => setActive('BUSD')}
        >
          BUSD
        </span>
        <span
          className={active === 'USDT' ? 'slickItem-active' : ''}
          onClick={() => setActive('USDT')}
        >
          USDT
        </span>
        <span
          className={active === 'BNB' ? 'slickItem-active' : ''}
          onClick={() => setActive('BNB')}
        >
          BNB
        </span>
        <span
          className={active === 'BTC' ? 'slickItem-active' : ''}
          onClick={() => setActive('BTC')}
        >
          BTC
        </span>
        <span
          className={active === 'ALTS' ? 'slickItem-active' : ''}
          onClick={() => setActive('ALTS')}
        >
          ALTS
        </span>
        <span
          className={active === 'ZONE' ? 'slickItem-active' : ''}
          onClick={() => setActive('ZONE')}
        >
          ZONE
        </span>
      </StyledSlick>
    );
  };
  return (
    <Container>
      <SearchBox>
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input placeholder="Search" />
      </SearchBox>
      <MenuSlick />
      <Header />
      <Table>
        {allPair !== undefined &&
          allPair?.map((item, index) => {
            return (
              <div
                className="d-flex justify-content-between table-item align-items-center"
                key={index}
              >
                <Pair className="d-flex align-items-center">
                  <StarIcon className="tableItem-star" />
                  {item.symbol && item.symbol.toUpperCase()}
                </Pair>
                <Price data-type={item.isPriceUp ? 'up' : 'down'}>
                  {numeral(item.latestPrice).format('0,0.00000000')}
                </Price>
                {activeChangeColumnMarket ? (
                  <Change data-type={item.change24h < 0 ? 'down' : 'up'}>
                    {numeral(item.change24h).format('0,0.00')}%
                  </Change>
                ) : (
                  <Change>{item.volume24h}M</Change>
                )}
              </div>
            );
          })}
      </Table>
    </Container>
  );
};
export default Market;
