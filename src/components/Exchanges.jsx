import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetCryptoExchangesQuery } from "../services/cryptoExchangesAPI";
import Loader from "./Loader";
import exchangeIcon from "../images/exchange.png";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchangesList, isFetching } = useGetCryptoExchangesQuery();

  if (isFetching) return <Loader />;

  let rankList = [];

  for (let i = 0; i < exchangesList.length; i++) {
    if (exchangesList[i].adjusted_rank) {
      rankList.push(exchangesList[i]);
    }
  }

  const sortRank = (a, b) => {
    return a.adjusted_rank - b.adjusted_rank;
  };

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Available Cryptocurrencies</Col>
      </Row>
      <Row>
        {rankList.map((exchange) => {
          return (
            <Col span={24}>
              <Collapse>
                <Panel
                  key={exchange.id}
                  showArrow={false}
                  header={
                    <Row key={exchange.id}>
                      <Col span={6}>
                        <Text>
                          <strong>{exchange.adjusted_rank}. </strong>
                        </Text>
                        <Avatar className="exchange-image" src={exchangeIcon} />
                        <Text>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>
                        ${millify(exchange.quotes.USD.adjusted_volume_24h)}
                      </Col>
                      <Col span={6}>{millify(exchange.markets)}</Col>
                      <Col span={6}>{millify(exchange.currencies)}</Col>
                    </Row>
                  }
                >
                  {HTMLReactParser(exchange.description || "")}
                  <p>Visit Exchange:</p>
                  <a
                    href={exchange?.links?.website[0]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {exchange.website_status
                      ? exchange.links.website[0]
                      : "No website available"}
                  </a>
                </Panel>
              </Collapse>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Exchanges;
