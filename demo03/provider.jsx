const { Form, Input, Button, Card, Row, Col, Table, Icon, Divider, Modal, message, Select, Popconfirm } = antd;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

const url = '/webapp/Controllers/AuditPrice/provider.php';

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSelectChange = (value) => {
    this.setState({
      city: value
    });
    this.props.handleFormChange('city', value)
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    this.props.handleFormChange(name, value)
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        <Form>
          <FormItem {...formItemLayout} label="供应商所在城市">
            <Select name="city" defaultValue={this.props.city} onChange={this.handleSelectChange} disabled={this.props.edit}>
              <Option value="sz">苏州</Option>
              <Option value="gd">广东</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="供应商代码">
            <Input name="code" defaultValue={this.props.code} onChange={this.handleChange} disabled={this.props.edit} />
          </FormItem>
          <FormItem {...formItemLayout} label="供应商名称">
            <Input name="name" defaultValue={this.props.name} onChange={this.handleChange} disabled={this.props.edit} />
          </FormItem>
          <FormItem {...formItemLayout} label="供应商联系人">
            <Input name="person" defaultValue={this.props.person} onChange={this.handleChange} />
          </FormItem>
          <FormItem {...formItemLayout} label="供应商电话">
            <Input name="tel" defaultValue={this.props.tel} onChange={this.handleChange} />
          </FormItem>
          <FormItem {...formItemLayout} label="供应商地址">
            <Input name="address" defaultValue={this.props.address} onChange={this.handleChange} />
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            <TextArea name="note" defaultValue={this.props.note} onChange={this.handleChange} />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

class ProviderTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedInfo: null,
      selectedRows: [],
      currentRow: null,
      modalVisible: false,
      editProvider: null,
      city: '',
      code: '',
      name: '',
      person: '',
      tel: '',
      address: '',
      note: '',
    };
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
  }

  clearSort = () => {
    this.setState({
      sortedInfo: null,
    });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addProvider = (e) => {
    this.setState({
      modalVisible: true,
      editProvider: false,
      currentRow: null,
    });
  }

  editProvider = (record, e) => {
    const { city, code, name, person, tel, address, note } = record
    this.setState({
      modalVisible: true,
      editProvider: true,
      currentRow: record,
      city,
      code,
      name,
      person,
      tel,
      address,
      note,
    });
  }

  deleteConfirm = (record, e) => {
    axios.post(url, {
      act: 'delete',
      id: [record.key]
    }).then((response) => {
      if (response.data.code) {
        message.error(response.data.msg);
      } else {
        message.success(response.data.msg);
        this.props.query();
      }
    })
  }

  deleteCancel = (e) => {
    message.info('已取消');
  }

  // batchDeleteConfirm = (e) => {
  //     let id = this.state.selectedRows.map((item) => {
  //         return item.key;
  //     });

  //     axios.post(url, {
  //         act: 'delete',
  //         id
  //     }).then((response) => {
  //         if (response.data.code) {
  //             message.error(response.data.msg);
  //         } else {
  //             message.success(response.data.msg);
  //         }
  //     })
  // }

  handleFormChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleOk = (e) => {
    const { city, code, name, person, tel, address, note } = this.state
    let act = '';
    let data = {};
    if (this.state.editProvider) {
      act = 'update';
      data = {
        act, city, code, name, person, tel, address, note, id: this.state.currentRow.key
      };
    } else {
      act = 'add';
      data = {
        act, city, code, name, person, tel, address, note
      };
    }

    axios.post(url, data).then((response) => {
      if (response.data.code) {
        message.error(response.data.msg);
      } else {
        this.setState({
          modalVisible: false,
        });
        message.success(response.data.msg);
        this.props.query();
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
    message.info('已取消');
  }

  rowClassName = (record, index) => {
    if (record.isDelete === '1') {
      return 'delete';
    }
  }

  render() {
    let sortedInfo = this.state.sortedInfo || {};

    const columns = [{
      title: '供应商所在城市',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city - b.city,
      sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
      render: (text, record) => (
        text === 'sz' ? '苏州' : text === 'gd' ? '广东' : '未知'
      ),
    }, {
      title: '供应商代码',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code - b.code,
      sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order,
    }, {
      title: '供应商名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: '供应商联系人',
      dataIndex: 'person',
      key: 'person',
      sorter: (a, b) => a.person - b.person,
      sortOrder: sortedInfo.columnKey === 'person' && sortedInfo.order,
    }, {
      title: '供应商电话',
      dataIndex: 'tel',
      key: 'tel',
      sorter: (a, b) => a.tel - b.tel,
      sortOrder: sortedInfo.columnKey === 'tel' && sortedInfo.order,
    }, {
      title: '供应商地址',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address - b.address,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    }, {
      title: '录入人',
      dataIndex: 'actionUser',
      key: 'actionUser',
      sorter: (a, b) => a.actionUser - b.actionUser,
      sortOrder: sortedInfo.columnKey === 'actionUser' && sortedInfo.order,
    }, {
      title: '录入日期',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => a.actionTime - b.actionTime,
      sortOrder: sortedInfo.columnKey === 'createTime' && sortedInfo.order,
    }, {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: '操作',
      dateIndex: 'action',
      key: 'action',
      render: (text, record) => (
        record.isDelete === '0' ?
          <span>
            <a href="javascript:;" onClick={this.editProvider.bind(this, record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确认弃用此供应商？" onConfirm={this.deleteConfirm.bind(this, record)} onCancel={this.deleteCancel} okText="确认" cancelText="取消">
              <a href="javascript:;">弃用</a>
            </Popconfirm>
          </span> : '已弃用'
      ),
    }];

    // const rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         this.setState({
    //             selectedRowKeys,
    //             selectedRows,
    //         });
    //     },
    //     getCheckboxProps: record => ({
    //         disabled: record.isDelete === '1',
    //         name: record.name,
    //     }),
    // };

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <div>
        <Form layout="inline">
          <FormItem>
            <Button type="primary" onClick={this.addProvider}><Icon type="plus" />新增</Button>
          </FormItem>
          {/* {
                        this.state.selectedRows.length ?
                            <FormItem>
                                <Popconfirm title="确认弃用这些供应商？" onConfirm={this.batchDeleteConfirm} onCancel={this.deleteCancel} okText="确认" cancelText="取消">
                                    <Button>批量弃用</Button>
                                </Popconfirm>
                            </FormItem> : null
                    } */}
          {
            this.state.sortedInfo ?
              <FormItem>
                <Button onClick={this.clearSort}>清除排序</Button>
              </FormItem> : null
          }
        </Form>

        <Table pagination={false} columns={columns} dataSource={this.props.data} onChange={this.handleTableChange} rowClassName={this.rowClassName} />

        <ModalForm title={this.state.editProvider ? '编辑供应商' : '新增供应商'} visible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} handleFormChange={this.handleFormChange} edit={this.state.editProvider} {...this.state.currentRow} />
      </div>
    );
  }
}

// const WrappedSearchForm = Form.create()(SearchForm);
// const WrappedModalForm = Form.create()(ModalForm);

class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      actionUser: '',
      data: [],
    };
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  query = (e) => {
    const { actionUser, code } = this.state
    axios.post(url, {
      act: 'query',
      actionUser,
      code,
    }).then((response) => {
      if (response.data.code) {
        message.warn(response.data.msg);
      } else {
        this.setState({
          data: response.data.data
        });
      }
    })
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <Row>
          <Col span={22} offset={1}>
            <Card title="供应商信息表">

              <Form layout="inline">
                <FormItem label="供应商代码">
                  <Input name="code" onChange={this.handleChange} />
                </FormItem>
                <FormItem label="录入人">
                  <Input name="actionUser" onChange={this.handleChange} />
                </FormItem>
                <FormItem>
                  <Button type="primary" onClick={this.query}>查询</Button>
                </FormItem>
                {/* <FormItem>
                                    <Button htmlType="reset">重置</Button>
                                </FormItem> */}
              </Form>

              <ProviderTable data={this.state.data} query={this.query} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
}

ReactDOM.render(
  <Provider />
  , document.querySelector('#root')
);
