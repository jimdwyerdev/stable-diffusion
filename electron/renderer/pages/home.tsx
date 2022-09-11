import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import electron from 'electron'
import {
  Alert,
  Layout,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Row,
  Col,
  Input
} from 'antd'


const {
  Header,
  Content,
} = Layout
const { Item: FormItem } = Form
const { Option } = Select

const ipcRenderer = electron.ipcRenderer || false

function Home() {
  const [form] = Form.useForm()

  const [message, setMessage] = React.useState(null)

  if (ipcRenderer) {
    // In this scope, the webpack process is the client
  }

  console.log('ipc', ipcRenderer)
  const onSubmitForm = (values: any) => {
    ipcRenderer.send('generate', values)
  }

  React.useEffect(() => {
    // like componentDidMount()

    // register `generate` event
    ipcRenderer.on('generate', (event, response) => {
      // debugger
      if(response.result == "success"){
        setMessage({error: false, data: response.data})
      } else {
        setMessage({error: true, data: response.data})
      }
    })

    return () => {
      // like componentWillUnmount()

      // unregister it
      ipcRenderer.removeAllListeners('generate')
    }
  }, [])

  // console.log('form', form)


  return (
    <React.Fragment>
      <Head>
        <title>Stable Diffusion</title>
      </Head>

      <Header>
        {/* <Link href="/next">
          <a>Go to next page</a>
        </Link> */}
        <h1 style={{color: 'white'}}>Stable Diffusion</h1>
      </Header>
      
      {message && <Alert message={message.data} type={message.error ? "error" : "success"} />}

      <Content style={{ padding: 48 }}>

        {/* <Row>
          <Col span={24}>col</Col>
        </Row> */}

        <Form layout='horizontal' name='control-hooks' form={form} onFinish={onSubmitForm}>

          <Form.Item name="prompt" label="Prompt" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          {/* <Form.Item
            label='Input Number'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber size='large' min={1} max={10} style={{ width: 100 }} defaultValue={3} name='inputNumber' />
            <a href='#'>Link</a>
          </Form.Item>

          <Form.Item
            label='Switch'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item
            label='Slider'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Slider defaultValue={70} />
          </Form.Item>

          <Form.Item
            label='Select'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Select size='large' defaultValue='lucy' style={{ width: 192 }}>
              <Option value='jack'>jack</Option>
              <Option value='lucy'>lucy</Option>
              <Option value='disabled' disabled>disabled</Option>
              <Option value='yiminghe'>yiminghe</Option>
            </Select>
          </Form.Item> */}

          <Form.Item
            style={{ marginTop: 48 }}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Button size='large' type='primary' htmlType='submit'>
              OK
            </Button>
            <Button size='large' style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </React.Fragment>
  )
}

export default Home
