<script setup lang="ts">
// imports
import { Loading, Notify } from 'quasar';
import { onMounted, ref } from 'vue'
import http from '../utils/axios';
import { Icon } from '@iconify/vue/dist/iconify.js';

// types
interface IPaginationDataTypes {
    per_page: number
    max: number
    max_page: number
}
interface IDeleteFormDataTypes {
    dialog_model: boolean
    item: object | any
}
interface ICreateCategoryFormTypes {
    dialog_model: boolean
    name: string
    key: string
}

// data
const pagination_form = ref<IPaginationDataTypes>({
    per_page: 1,
    max: 1,
    max_page: 6
})
const movies = ref<object | any>([])
const category_table_header: any = [
    {
        name: 'id',
        label: "ID",
        field: (row: any) => row.id,
        align: 'center'
    },
    {
        name: 'name',
        label: "Nomi",
        field: (row: any) => row.name,
        align: 'center'
    },
    {
        name: 'key',
        label: "Kalit so'z",
        field: (row: any) => row.key,
        align: 'center'
    },
    {
        name: 'actions',
        label: "Amallar",
        align: 'center'
    },
]
const headers: any = [
    {
        name: 'id',
        label: "ID",
        field: (row: any) => row.id,
        align: 'center'
    },
    {
        name: 'name',
        label: "Film nomi",
        field: (row: any) => row.name,
        align: 'center'
    },
    {
        name: 'country',
        label: "Mamlakat",
        field: (row: any) => row.country,
        align: 'center'
    },
    {
        name: 'movie_date',
        label: "Chiqarilgan sana",
        field: (row: any) => row.movie_date,
        align: 'center'
    },
    {
        name: 'category_name',
        label: "Janri",
        field: (row: any) => row.category_name,
        align: 'center'
    },
    {
        name: 'language',
        label: "Tili",
        field: (row: any) => row.language,
        align: 'center'
    },
    {
        name: 'actions',
        label: "Amallar",
        align: 'center'
    },
]
const search = ref<string>('')
const delete_form = ref<IDeleteFormDataTypes>({
    dialog_model: false,
    item: {}
})
const create_category_form = ref<ICreateCategoryFormTypes>({
    dialog_model: false,
    name: '',
    key: ''
})

// methods
async function getMoviePosts() {
    try {
        Loading.show()
        const { data } = await http.get('/api/get-movies', {
            params: {
                page_number: pagination_form.value.per_page,
                movie_name: search.value
            }
        })
        pagination_form.value.max = data.maxPage
        movies.value = data.data
    } catch (e) {
        Notify.create({
            color: "red",
            message: "Filmlarni yiklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function showDeletePostDialog(item: any) {
    delete_form.value.item = item
    delete_form.value.dialog_model = true
}

async function deleteMovie() {
    try {
        Loading.show()
        await http.delete('/api/delete-movie-post', {
            params: {
                post_id: delete_form.value.item.id
            }
        })
        getMoviePosts()
        delete_form.value.dialog_model = false
        Notify.create({
            color: "green",
            message: "Film muvoffaqiyatli o'chirildi!"
        })
    } catch (e) {
        Notify.create({
            color: "red",
            message: "Filmni o'chirishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function showCreateCategoryDialog() {
    create_category_form.value.name = ''
    create_category_form.value.key = ''
    create_category_form.value.dialog_model = true
}

async function sendCategoryForm() {
    try {
        Loading.show()
        await http.post('/api/create-category', {
            name: create_category_form.value.name,
            key: create_category_form.value.key
        })
        create_category_form.value.dialog_model = false
        Notify.create({
            color: "green",
            message: "Yangi kategoriya muvoffaqiyatli yaratildi!"
        })
    } catch (e) {
        Notify.create({
            color: "red",
            message: "Yangi kategoriya yaratishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}

// mounted
onMounted(() => {
    getMoviePosts()
})

</script>

<template>
    <div class="top-items">
        <div class="w-1/2">
            <div class="w-2/4">
                <q-input outlined dense placeholder="Post qidiruv..." v-model="search" @keyup.enter="getMoviePosts">
                    <template #append>
                        <Icon icon="ri-search-line" class="cursor-pointer" @click="getMoviePosts" />
                    </template>
                </q-input>
            </div>
        </div>
        <div class="flex justify-end w-1/2">
            <q-btn color="secondary" unelevated @click="showCreateCategoryDialog">Yangi kategoriya yaratish</q-btn>
            <q-btn class="mx-2" unelevated color="secondary">Yangi post yaratish</q-btn>
            <q-pagination v-model="pagination_form.per_page" :max-pages="pagination_form.max_page"
                :max="pagination_form.max" @update:model-value="getMoviePosts" />
        </div>
    </div>

    <div class="page flex">
        <div class="w-4/6 pr-1">
            <q-table :rows="movies" :columns="headers" :rows-per-page-options="[0]" hide-pagination
                no-data-label="Ma'lumotlar mavjud emas" flat class="border mt-2" title="Postlar">
                <template #body-cell-actions="props">
                    <q-td class="flex items-center justify-center">
                        <q-btn round unelevated color="red" dense @click="showDeletePostDialog(props.row)">
                            <Icon icon="ri-delete-bin-line" />
                            <q-tooltip>
                                O'chirish
                            </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <div class="w-2/6 pl-1">
            <q-table :columns="category_table_header" :rows-per-page-options="[0]" hide-pagination flat
                class="border mt-2" title="Kategoriya" no-data-label="Ma'lumotlar mavjud emas!" />
        </div>
    </div>

    <q-dialog v-model="delete_form.dialog_model" persistent>
        <q-card style="min-width: 500px; min-height: 200px; padding: 10px;">
            <span class="text-lg">
                {{ delete_form.item.name }} nomli filmni o'chirishni tasdiqlaysizmi?
            </span>

            <div class="absolute bottom-0 right-0 p-2">
                <q-btn unelevated color="secondary" class="mr-2" @click="deleteMovie">Tasdiqlash</q-btn>
                <q-btn unelevated color="red" @click="delete_form.dialog_model = false">Bekor qilish</q-btn>
            </div>
        </q-card>
    </q-dialog>

    <q-dialog v-model="create_category_form.dialog_model">
        <q-card style="min-width: 600px; min-height: 400px;">
            <div>
                <div class="p-2">
                    <span class="text-lg">
                        Kategoriya yaratish
                    </span>

                    <div class="mt-4">
                        <q-input placeholder="Nomi" outlined dense v-model="create_category_form.name" />
                        <q-input placeholder="Kalit so'zi" outlined dense class="mt-2" v-model="create_category_form.key" />
                    </div>
                </div>
                <div class="absolute bottom-0 right-0 p-2">
                    <q-btn unelevated color="secondary" @click="sendCategoryForm"
                        :disable="!create_category_form.name || !create_category_form.key">
                        Yaratish
                        <q-tooltip>
                            Yangi kategoriya yaratish!
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<style scoped lang="scss">
.top-items {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: flex-end;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>