import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Typography } from 'antd';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { fetchTasks, addTask, updateTask, deleteTask } from '../redux/action/taskAction';

const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  const API_URL = 'http://127.0.0.1:8000/api/tasks';
  const token = localStorage.getItem('token');
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    loadTasks();
  }, []);

 const loadTasks = async () => {
  setLoading(true);
  try {
    const { data } = await axios.get(API_URL, authConfig);
    const taskList = data.data;

    // Pour chaque tâche, faire une requête pour récupérer le nom du user
    const tasksWithUserNames = await Promise.all(
      taskList.map(async (task) => {
        try {
          const userResponse = await axios.get(`http://127.0.0.1:8000/api/user/${task.user_id}`, authConfig);
          return {
            ...task,
            user_name: userResponse.data.name || 'Utilisateur inconnu',
          };
        } catch (err) {
          return {
            ...task,
            user_name: 'Erreur utilisateur',
          };
        }
      })
    );

    setTasks(tasksWithUserNames);
  } catch (error) {
    message.error("Erreur lors du chargement des tâches");
  } finally {
    setLoading(false);
  }
};

  const openModal = (task = null) => {
    setEditingTask(task);
    form.setFieldsValue(task || { title: '', description: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    form.resetFields();
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleFinish = async (values) => {
    if (editingTask) {
      await dispatch(updateTask(editingTask.id, values));
      message.success('Tâche mise à jour');
    } else {
      await dispatch(addTask(values));
      message.success('Tâche ajoutée');
    }
    closeModal();
    loadTasks();
  };

  const confirmDelete = async (id) => {
    await dispatch(deleteTask(id));
    message.success('Tâche supprimée');
    loadTasks();
  };

  const columns = [
    {
      title: 'Titre',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Utilisateur',
      dataIndex: ['user', 'name'],
      key: 'user',
      render: (text, record) => record.user_name ? record.user_name : 'Inconnu',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>Modifier</Button>
          <Popconfirm
            title="Confirmer la suppression ?"
            onConfirm={() => confirmDelete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link" danger>Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ padding: '24px' }}>
          <Title level={2}>Tableau de bord</Title>

          <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
            Ajouter une tâche
          </Button>

          <Table
            dataSource={tasks}
            columns={columns}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />

          <Modal
            title={editingTask ? 'Modifier une tâche' : 'Ajouter une tâche'}
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
            destroyOnClose
          >
            <Form layout="vertical" form={form} onFinish={handleFinish}>
              <Form.Item
                name="title"
                label="Titre"
                rules={[{ required: true, message: 'Veuillez saisir un titre' }]}
              >
                <Input placeholder="Entrez le titre" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Veuillez saisir une description' }]}
              >
                <Input.TextArea rows={4} placeholder="Entrez la description" />
              </Form.Item>

              <Form.Item>
                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={closeModal}>Annuler</Button>
                  <Button type="primary" htmlType="submit">
                    {editingTask ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
