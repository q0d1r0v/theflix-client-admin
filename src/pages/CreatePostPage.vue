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
    id: number
}
interface ICreatePostDataTypes {
    dialog_model: boolean
    country: string
    movie_date: string
    category_id: string | number
    language: string
    duration: string
    rating: string
    trailer: string
    movie_file: object | any
    cover_image_file: object | any
}

// data
const create_form_data = ref<ICreatePostDataTypes>({
    dialog_model: false,
    country: '',
    movie_date: '',
    category_id: '',
    language: '',
    duration: '',
    rating: '',
    trailer: '',
    movie_file: '',
    cover_image_file: ''
})
const pagination_form = ref<IPaginationDataTypes>({
    per_page: 1,
    max: 1,
    max_page: 6
})
const movies = ref<object | any>([])
const categories = ref<object | any>([])
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
        align: 'left'
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
    key: '',
    id: 0,
})
const editing = ref<boolean>(false)
interface ICategoryItemType {
    dialog_model: boolean
    item: object | any
}
const category_item = ref<ICategoryItemType>({
    dialog_model: false,
    item: {}
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
async function getCategories() {
    try {
        Loading.show()
        const { data } = await http.get('/api/get-categories', {
            params: {
                page_number: pagination_form.value.per_page
            }
        })
        pagination_form.value.max = data.maxPage
        categories.value = data.data
    } catch (e) {
        Notify.create({
            color: "red",
            message: "Kategoriyalarni yiklab olishda xatolik yuz berdi!"
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
    editing.value = false
    create_category_form.value.name = ''
    create_category_form.value.key = ''
    create_category_form.value.dialog_model = true
}
function showEditCategoryDialog(item: any) {
    editing.value = true
    create_category_form.value.id = item.id
    create_category_form.value.name = item.name
    create_category_form.value.key = item.key
    create_category_form.value.dialog_model = true
}

async function sendCategoryForm() {
    try {
        Loading.show()
        await http.post('/api/create-category', {
            name: create_category_form.value.name,
            key: create_category_form.value.key
        })
        await getCategories()
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

async function updateCategoryForm() {
    try {
        Loading.show()
        await http.put('/api/update-category', {
            category_id: create_category_form.value.id,
            new_name: create_category_form.value.name,
            new_key: create_category_form.value.key
        })
        await getCategories()
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
function showDeleteCategoryDialog(item: any) {
    category_item.value.item = item
    category_item.value.dialog_model = true
}
async function deleteCategory() {
    try {
        Loading.show()

        await http.delete('/api/delete-category', {
            params: {
                category_id: category_item.value.item.id
            }
        })

        await getCategories()
        category_item.value.dialog_model = false
        Notify.create({
            color: "green",
            message: "Kategoriya muvoffaqiyatli o'chririldi!"
        })
    } catch (e) {
        Notify.create({
            color: "red",
            message: "Kategoriyani o'chirishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}
function showCreatePostDialog() {
    create_form_data.value.country = ''
    create_form_data.value.movie_date = ''
    create_form_data.value.category_id = ''
    create_form_data.value.language = ''
    create_form_data.value.duration = ''
    create_form_data.value.rating = ''
    create_form_data.value.trailer = ''
    create_form_data.value.movie_file = ''
    create_form_data.value.cover_image_file = ''
    create_form_data.value.dialog_model = true
}
function validateToVideo(event: object | any) {
    if (event?.type?.split('/')[0] !== 'video') {
        create_form_data.value.movie_file = ''
        Notify.create({
            color: "orange",
            message: "Iltimos video file tanlang!"
        })
    }
}
function validateToImage(event: object | any) {
    if (event?.type?.split('/')[0] !== 'image') {
        create_form_data.value.cover_image_file = ''
        Notify.create({
            color: "orange",
            message: "Iltimos rasm file tanlang!"
        })
    }
}

// mounted
onMounted(() => {
    getCategories()
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
            <q-btn class="mx-2" unelevated color="secondary" @click="showCreatePostDialog">Yangi post yaratish</q-btn>
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
            <q-table :columns="category_table_header" :rows="categories" :rows-per-page-options="[0]" hide-pagination flat
                class="border mt-2" title="Kategoriya" no-data-label="Ma'lumotlar mavjud emas!">
                <template #body-cell-actions="props">
                    <q-td>
                        <q-btn unelevated round color="orange" dense outline @click="showEditCategoryDialog(props.row)">
                            <Icon icon="ri-pencil-line" />
                            <q-tooltip>
                                O'zgartirish
                            </q-tooltip>
                        </q-btn>
                        <q-btn unelevated round color="red" dense outline class="ml-2"
                            @click="showDeleteCategoryDialog(props.row)">
                            <Icon icon="ri-delete-bin-line" />
                            <q-tooltip>
                                O'chirish
                            </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
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
                    <span class="text-lg" v-if="!editing">
                        Kategoriya yaratish
                    </span>
                    <span class="text-lg" v-else>
                        Kategoriyani o'zgartirish
                    </span>

                    <div class="mt-4">
                        <q-input placeholder="Nomi" outlined dense v-model="create_category_form.name" />
                        <q-input placeholder="Kalit so'zi" outlined dense class="mt-2" v-model="create_category_form.key" />
                    </div>
                </div>
                <div class="absolute bottom-0 right-0 p-2">
                    <q-btn unelevated color="secondary" @click="sendCategoryForm"
                        :disable="!create_category_form.name || !create_category_form.key" v-if="!editing">
                        Yaratish
                        <q-tooltip>
                            Yangi kategoriya yaratish!
                        </q-tooltip>
                    </q-btn>
                    <q-btn unelevated color="secondary" :disable="!create_category_form.name || !create_category_form.key"
                        v-else @click="updateCategoryForm">
                        O'zgartirish
                        <q-tooltip>
                            Kategoriyani o'zgartirish!
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>
        </q-card>
    </q-dialog>

    <q-dialog v-model="category_item.dialog_model">
        <q-card style="min-width: 500px; min-height: 200px; padding: 10px;">
            <div>
                <span class="text-xl">
                    {{ category_item.item.name }}ni o'shirishni tasdiqlaysizmi?
                </span>
                <div class="absolute bottom-0 right-0 p-2">
                    <q-btn unelevated color="red" @click="deleteCategory">
                        O'chirish
                        <q-tooltip>
                            O'chirishni tasdiqlash!
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>
        </q-card>
    </q-dialog>

    <q-dialog v-model="create_form_data.dialog_model" persistent>
        <q-card style="min-width: 600px; min-height: 500px;">
            <div class="absolute right-0 m-2">
                <Icon icon="ri-close-line" class="text-xl text-red cursor-pointer"
                    @click="create_form_data.dialog_model = false" />
            </div>
            <div>
                <div class="p-2">
                    <span class="text-lg select-none">
                        Yangi post yaratish
                    </span>

                    <div class="mt-4">
                        <q-input placeholder="Mamlakat" outlined dense v-model="create_form_data.country" clearable />
                        <q-input placeholder="Film yaratilgan sana" outlined dense class="mt-2"
                            v-model="create_form_data.movie_date" clearable />
                        <q-select label="Kategoriya" outlined dense class="mt-2" v-model="create_form_data.category_id"
                            :options="categories" option-value="id" option-label="name" map-options emit-value clearable />
                        <q-input placeholder="Film tili" outlined dense class="mt-2" v-model="create_form_data.language"
                            clearable />
                        <q-input placeholder="Baho" outlined dense class="mt-2" v-model="create_form_data.rating"
                            clearable />
                        <q-input placeholder="Trailler" outlined dense class="mt-2" v-model="create_form_data.trailer"
                            clearable />
                        <q-file v-model="create_form_data.movie_file" label="Filmni yuklash" outlined dense class="mt-2"
                            clearable @update:model-value="validateToVideo">
                            <template v-slot:append>
                                <q-icon name="attach_file" />
                            </template>
                        </q-file>
                        <q-file v-model="create_form_data.cover_image_file" label="Cover image file" outlined dense
                            class="mt-2" clearable @update:model-value="validateToImage">
                            <template v-slot:append>
                                <q-icon name="attach_file" />
                            </template>
                        </q-file>
                    </div>
                </div>
                <div class="absolute bottom-0 right-0 p-2">
                    <q-btn unelevated color="secondary">
                        Yaratish
                        <q-tooltip>
                            Yangi post yaratish!
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