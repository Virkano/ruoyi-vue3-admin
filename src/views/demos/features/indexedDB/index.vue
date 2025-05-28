<script setup>
import { openDB } from 'idb'
import { onMounted } from 'vue'

const { proxy } = getCurrentInstance()

const allStudents = ref()

// 初始化数据库
const dbPromise = openDB('StudentDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('students')) {
      db.createObjectStore('students', { keyPath: 'id', autoIncrement: true })
    }
  },
})

// 新增学生
async function addStudent(student) {
  const db = await dbPromise
  await db.add('students', student)
  console.log('学生已添加:', student)
}

// 查询所有学生
async function getAllStudents() {
  const db = await dbPromise
  const students = await db.getAll('students')
  console.log('学生名单:', students)
  return students
}

// 更新学生
async function updateStudent(student) {
  const db = await dbPromise
  await db.put('students', student)
  console.log('学生信息已更新:', student)
}

// 删除学生
async function deleteStudent(id) {
  const db = await dbPromise
  await db.delete('students', id)
  console.log(`学生 ID=${id} 已删除`)
}

async function initData() {
  const localStudents = await getAllStudents()
  if (localStudents.length > 0) {
    ElMessage({ message: '本地有学生数据', type: 'warning' })
  }
  else {
    await addStudent({ name: 'Alice', age: 20, grade: 'A' })
    await addStudent({ name: 'Bob', age: 22, grade: 'B' })
  }
  allStudents.value = await getAllStudents()
}

async function addData() {
  await addStudent({ name: 'Charlie', age: 21, grade: 'C' })
  allStudents.value = await getAllStudents()
}

async function updateData() {
  const students = await getAllStudents()
  if (students.length > 0) {
    proxy.$prompt(`请输入对应名字`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal: false,
    }).then(async ({ value }) => {
      const obj = students.find(s => s.name === value)
      obj.grade = 'A+'
      console.log(`output->obj`, obj)
      await updateStudent(alice)
      allStudents.value = await getAllStudents()
    }).catch(() => {
      ElMessage({ message: '您取消了更新', type: 'info' })
    })
  }
  else {
    ElMessage({ message: '暂无学生数据', type: 'error' })
  }
}

async function deleteData() {
  const students = await getAllStudents()
  if (students.length > 0) {
    proxy.$prompt(`请输入对应名字的 id 信息`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal: false,
    }).then(async ({ value }) => {
      await deleteStudent(Number(value))
      allStudents.value = await getAllStudents()
    }).catch(() => {
      ElMessage({ message: '您取消了删除', type: 'info' })
    })
  }
  else {
    ElMessage({ message: '暂无学生数据', type: 'error' })
  }
}

onMounted(async () => {
  allStudents.value = await getAllStudents()
})

// async function originalStorage() {
//   const localStudents = await getAllStudents()
//   const isHaveAlice = localStudents.find(s => s.name === 'Alice')
//   if (!isHaveAlice) {
//     await addStudent({ name: 'Alice', age: 20, grade: 'A' })
//   }
//   await addStudent({ name: 'Bob', age: 22, grade: 'B' })

//   const students = await getAllStudents()
//   allStudents.value = students
//   console.log('学生名单:', students)

//   const alice = students.find(s => s.name === 'Alice')
//   alice.grade = 'A+'
//   await updateStudent(alice)

//   const bob = students.find(s => s.name === 'Bob')
//   await deleteStudent(bob.id)
//   const overStudent = await getAllStudents()
//   funOverStudent.value = overStudent
//   console.log('最终学生名单:', overStudent)
// }
</script>

<template>
  <div>
    <div class="relative px-15 py-15 border-bottom">
      <div class="mb-4 flex text-18 font-semibold">
        IndexedDB
      </div>
      <div class="text-14 mt-2">
        简单来说，<strong>IndexedDB</strong> 是一个“存得多、用得快、查得细”的数据库。相较之下，<strong>localStorage</strong> 就像是一个小抽屉，而状态管理库更像是数据快递员，瞬时保存数据，刷新就消失。
      </div>
    </div>
    <div class="app-container">
      <el-card class="mt-15px" shadow="never">
        <template #header>
          <div class="card-header">
            <span>IndexedDB</span>
          </div>
        </template>
        <el-button
          type="primary"
          class="mr-2"
          @click="initData"
        >
          初始化数据
        </el-button>
        <el-button
          type="primary"
          class="mr-2"
          @click="addData"
        >
          新增数据
        </el-button>
        <el-button
          type="primary"
          class="mr-2"
          @click="updateData"
        >
          修改数据
        </el-button>
        <el-button
          type="primary"
          class="mr-2"
          @click="deleteData"
        >
          删除单个数据
        </el-button>

        <div class="w-full py-20px">
          学生名单：{{ allStudents }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid var(--tags-item-border, rgba(5, 5, 5, 0.06));
}
</style>
