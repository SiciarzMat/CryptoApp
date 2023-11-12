import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.data) {
    return "Loading...";
  } else {
    const slicedNews = simplified
      ? Object.entries(cryptoNews.data).slice(0, 6)
      : Object.entries(cryptoNews.data).slice(0, 12);
    console.log(slicedNews);

    return (
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setnewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {slicedNews.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news[1].url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news[1].title.length > 70
                      ? `${news[1].title.substring(0, 70)}...`
                      : news[1].title}
                  </Title>
                  <img
                    style={{ maxWidth: "150px", maxHeight: "100px" }}
                    src={news[1]?.photo_url || demoImage}
                    alt="News"
                  />
                </div>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={news[1].source_favicon_url || demoImage}
                      alt="news"
                    />
                    <Text className="provider-name">{news[1].source_url}</Text>
                  </div>
                  <Text>
                    {moment(news[1].published_datetime_utc)
                      .startOf("ss")
                      .fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
};

export default News;
