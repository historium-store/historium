<template>
  <div v-show="display" class="z-50 fixed top-0 bottom-0 overflow-y-auto bg-primary-950">
    <div class="text-gray-100 text-xl">
      <div class="p-2.5 mt-1 flex items-center">
        <h1 class="font-light text-gray-200 text-[15px] ml-3">Категорії книг</h1>
        <i class="bi bi-x cursor-pointer ml-28 lg:hidden" @click="toogleSidebar">X</i>
      </div>
      <div class="my-2 bg-gray-600 h-[1px]"></div>
    </div>
    <div
      v-for="section in sections"
      :key="section._id"
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-bookmark-fill">•</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">{{ section.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: true,
      sections: [
        {
          _id: '6467a0245295b1644a16134f',
          name: 'Фентезі Меча і Магії',
          products: [],
          sections: []
        },
        {
          _id: '6467acb7d4a419392539bb56',
          name: 'Пригодницькі романи для дітей',
          products: [],
          sections: []
        },
        {
          _id: '6467babfeb6e1cbe15dff2c4',
          name: 'Супергерої',
          products: [],
          sections: []
        },
        {
          _id: '646e406b0e6725cfd50af9aa',
          name: 'Політичні фігури',
          products: [],
          sections: []
        },
        {
          _id: '646e44adb8d1ac492191c825',
          name: 'example',
          products: [],
          sections: []
        },
        {
          _id: '646f7d19a4e716ba96177580',
          name: 'Aboba',
          key: 'aboba',
          products: [],
          sections: []
        },
        {
          _id: '6470ad2e576dc412d88028fd',
          name: 'Фентезі',
          key: 'fantasy',
          products: [
            {
              _id: '6470c516ca6fb2c20d62fa3b',
              name: 'Гаррі Поттер і філософський камінь',
              price: 320,
              quantity: 1000,
              type: {
                _id: '646622f5eadf03bd22d5e987',
                name: 'Книга'
              },
              sections: [
                {
                  _id: '6470ad2e576dc412d88028fd',
                  name: 'Фентезі',
                  key: 'fantasy',
                  products: ['6470c516ca6fb2c20d62fa3b'],
                  sections: []
                }
              ],
              description:
                "Перша частина пригод Гаррі Поттера — книга №1 для маленьких читачів. Саме вона сколихнула хвилю любові до читання, яка захопила цілий світ! Такого успіху не мала жодне художне ходожнє видання, доки 1997 року на полицях англійських магазинів не з'явилася перша книга Джоан Роулінг «Гаррі Поттер і філософський камінь». Сирота на ім'я Гаррі живе під сходами у будинку дядька ті тітоньски Дурслі. Він поки що не знає, як потрапити на платформу дев'ять і три чверті, користуватися чарівною паличкою, та літати на мітлі. Але одного разу до нього прилетить сова із загаднковим листом, який запрошує його до навчання у Школі Чарів та Чаклунства, і з того дня його життя докорінно зміниться... Варто було лише потрапити до магічного світу, як непоказний сором'язливий хлопець стає у центрі уваги, бо він, виявляється, Хлопчик-який-вижив. Тепер на юного чарівника чекають захопливі пригоди у Гоґвортсі, справжні друзі та смертельна небезпека від давнього ворога його сім'ї. Чи стане йому до снаги боротьба зі злими чарами?.. Перекладена книга «Гаррі Поттер і філософський камінь» українською мовою у видавництві «А-БА-БА-ГА-ЛА-МА-ГА». Над перекладом працював поет та публіцист Віктор Морозов, якого вважають кращим перекладачем Джоан Роулінг.",
              reviews: [],
              images: [
                '10781c84-de0f-4868-bfb5-d0f46ec28a75.webp',
                'ea41b8a4-21b8-422f-a501-34b30969264d.webp',
                'a8bae3f1-2f32-4a7f-bf52-04362abb453b.webp'
              ],
              code: '2'
            }
          ],
          sections: []
        },
        {
          _id: '6470d0b46dbb67612e4a82a8',
          name: 'Пригоди',
          key: 'adventures',
          products: [],
          sections: []
        }
      ]
    }
  },
  methods: {
    toogleSidebar() {
      this.display = !this.display
    }
  }
}
</script>

<style></style>
