import { handleImageSrc } from "@/hooks";
import Image from "next/image";
import { activeImageState, tagsState } from "@/store";
import { useRecoilValue } from "recoil";
import { Button, Col, Input, Rate, Row, Select, Tooltip } from "antd";
import styles from "./basic.module.css";
import { useRouter } from "next/router";

const SiderBasic = () => {
  const image = useRecoilValue(activeImageState);
  const tags = useRecoilValue(tagsState);

  if (!image) return null;

  const handleTime = (time: number) => {
    const [date, t] = new Date(time)
      .toLocaleString()
      .replace(/:\d+$/, "")
      .split(" ");

    return (
      date
        .split("/")
        .map((item) => (item.length === 1 ? "0" + item : item))
        .join("/") +
      " " +
      t
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Image
        width={200}
        height={image.height / (image.width / 200)}
        style={{ objectFit: "contain", borderRadius: 8, margin: "auto" }}
        src={handleImageSrc(image, true)}
        alt={`${image.id}/${image.name}/${image.ext}`}
      />

      <Row
        gutter={[2, 0]}
        style={{ marginTop: 20, height: 12 }}
        className={styles.palettes}
      >
        {image.palettes.map((item, i) => (
          <Col key={i} flex={1}>
            <Tooltip title={`rgb(${item.color})`}>
              <div
                style={{
                  backgroundColor: `rgb(${item.color})`,
                  height: 12,
                }}
              />
            </Tooltip>
          </Col>
        ))}
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col flex={1}>
          <Input value={image.name} disabled />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col flex={1}>
          <Select
            style={{ width: "100%" }}
            placeholder="暂无标签"
            disabled
            mode="multiple"
            value={image.tags}
            options={tags?.historyTags.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col flex={1}>
          <Input value={image.annotation} disabled placeholder="暂无注释" />
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col flex={1}>
          <Input value={image.url} disabled placeholder="暂无链接" />
        </Col>
      </Row>
      <div style={{ marginTop: 20 }} className={styles.baseInfo}>
        <Row>
          <Col>基本信息</Col>
        </Row>

        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>评分</Col>
          <Col>
            <Rate value={image.star || 0} disabled />
          </Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>尺寸</Col>
          <Col>
            {image.width} x {image.height}
          </Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>文件大小</Col>
          <Col>{(image.size / 1024).toFixed(2)} KB</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>格式</Col>
          <Col>{image.ext.toLocaleUpperCase()}</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>添加日期</Col>
          <Col>{handleTime(image.mtime)}</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>创建日期</Col>
          <Col>{handleTime(image.btime)}</Col>
        </Row>
        <Row align="middle" style={{ marginTop: 10 }}>
          <Col span={8}>修改日期</Col>
          <Col>{handleTime(image.lastModified)}</Col>
        </Row>

        <Row style={{ marginTop: 20 }}>
          <Col flex={1}>
            <Button
              block
              type="primary"
              onClick={() => {
                open(handleImageSrc(image));
              }}
            >
              查看原图
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SiderBasic;
