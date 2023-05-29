<template>
  <div class="showcase-layout grid grid-cols-5 gap-4 mx-auto p-6">
    <div v-for="good in goods" :key="good.product._id" class="rounded-lg hover:bg-primary-1000">
      <div class="card-poster bg-primary-950 rounded-md p-3">
        <img class="rounded-sm object-cover" :src="good.product.images[0]" alt="" />
      </div>
      <div class="card-content my-2 px-2">
        <div class="card-category">
          <a class="title-label">{{ good.product.name }}</a>
          <div class="author-wrapper">
            <a class="creator-label text-[12px]">{{ good.authors[0]?.fullName }}</a>
          </div>
        </div>
        <div class="price-wrapper">
          <div class="price-display text-[18px]">
            <span class="pe-1">{{ good.product.price }}</span>
            <span class="price-display-currency">грн</span>
          </div>
        </div>
        <div class="availability-status">
          <!-- <svg></svg>  -->
          <span :class="`status-text ` + (isAvailable(good) ? 'text-green-500' : 'text-red-500')">{{
            isAvailable(good) ? 'В наявності' : 'Немає в наявності'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [
        {
          _id: '6473b1aa394b41f5828a5e3d',
          product: {
            _id: '6473b1aa394b41f5828a5e34',
            name: 'Людина в пошуках справжнього сенсу. Психолог у концтаборі',
            price: 130,
            quantity: 10000,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a44ba12216f94b1036cb',
                name: 'Персональні трансформації',
                key: 'personalni-transformaciyi',
                products: ['6473b1aa394b41f5828a5e34', '6473b733569debe2438c78b7'],
                sections: [],
                createdAt: 1685300299603,
                updatedAt: 1685305139480
              }
            ],
            description:
              'Три роки ув’язнення в концентраційних таборах Дахау і Освенцимі, голод, приниження, нелюдська жорстокість та страждання — не кожен зміг вижити в таких умовах, а написати про свій досвід життєстверджуючий твір наважився лише Віктор Франкл, австрійський психолог і філософ, засновник логотерапії. «Людина у пошуках справжнього сенсу. Психолог у концтаборі» розійшлась накладом в 10 мільйонів екземплярів і переведена на 24 мови світу. Книга складається з двох частин: власне ув’язнення, опис життя в концтаборі та роз’яснення, спостереження та виведення нового психіатричного методу — логотерапії і введення поняття проактивності. Згідно його теорій між подіями, які випали на долю людини, і її ставлення до них лежить свободна воля. Інакше кажучи, ми самі вибираємо, як відноситись до свого життя і оточуючого світу. Сучасна психіатрія й досі спирається на тези, виведені Франклом, і визнає величезний внесок в пошук сенсу і мотивацію людського існування.',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/9f380f65-07fb-44b5-ba03-11e64f37721d.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/28885943-b2ab-49fb-9cfc-77a0dd68e8bd.webp'
            ],
            createdAt: 1685303722631,
            updatedAt: 1685303722631,
            code: '115967'
          },
          publisher: {
            _id: '64734a279d7e69643faf5ec2',
            name: 'Книжковий клуб "Клуб Сімейного Дозвілля"',
            bookSeries: [],
            books: ['6473b1aa394b41f5828a5e3d', '6473b87b569debe2438c78e3'],
            createdAt: 1685277223872,
            updatedAt: 1685305467933
          },
          languages: ['Українська'],
          publishedIn: 2020,
          authors: [
            {
              _id: '6473aa07c9dd40d6f991c580',
              fullName: 'Вiктор Франкл',
              books: ['6473b1aa394b41f5828a5e3d'],
              pictures: [],
              createdAt: 1685301767669,
              updatedAt: 1685303723098
            }
          ],
          compilers: [],
          translators: [
            {
              _id: '6473ab57c9dd40d6f991c5b5',
              fullName: 'Олена Замойська',
              books: ['6473b1aa394b41f5828a5e3d'],
              createdAt: 1685302103282,
              updatedAt: 1685303723202
            }
          ],
          illustrators: [],
          editors: [],
          copies: 10000,
          isbns: ['978-617-12-0452-2'],
          firstPublishedIn: 1959,
          originalName: "Man's Search For Meaning: The Classic Tribute To Hope From The Holocaust",
          format: '110х170 мм',
          pages: 160,
          weight: 150,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473b317569debe2438c7856',
          product: {
            _id: '6473b317569debe2438c784d',
            name: 'Я бачу, вас цікавить пітьма',
            price: 500,
            quantity: 3000,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a52ec9dd40d6f991c4e9',
                name: 'Сучасна проза',
                key: 'suchasna-proza',
                products: ['6473b317569debe2438c784d'],
                sections: [],
                createdAt: 1685300526802,
                updatedAt: 1685304087740
              }
            ],
            description:
              'Київського кримінального психолога Андрія Гайстера відправляють консультантом у богом забуте селище Буськів Сад. Зимової ночі там зникла маленька дівчинка. А ще там водиться Звір — серійний маніяк, убивств якого тамтешні мешканці воліють не помічати... У цьому проклятому селищі, де все по колу і всі живуть життям, яке ненавидять, розслідування постійно заходить у глухий кут. Андрій вірить, що загублена дівчинка, попри все, жива і він її знайде. Але нікому, крім нього, це не потрібно. «Я бачу, вас цікавить пітьма» — історія про непробивну людську байдужість і пітьму всередині нас. Про чесність із собою й ціну, яку ми готові заплатити за забуття. Про гріхи, що матеріалізуються, і спокуту, дорожчу за спокій.',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/5fd2d6a8-f84a-4bda-b86e-c524a2fb7feb.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/07abc2c1-f5b3-4626-a64f-425e89efd56a.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/abcd6e01-0642-4508-9c79-b7f88ef7a20a.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/e6622d24-6979-45c6-ac64-23a518699c94.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/8be9e0a4-ba5c-4afa-8370-540b9ad8eda0.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/ae9f3f20-a1ec-48fa-8454-e93dafc86284.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/25da7617-b5ac-474a-884a-d4a9d0a21310.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/09f2a313-893c-41c7-85d7-2b180b1c4567.webp'
            ],
            createdAt: 1685304087596,
            updatedAt: 1685304087596,
            code: '115968'
          },
          publisher: {
            _id: '64734a3b9d7e69643faf5ecb',
            name: 'Видавництво Старого Лева',
            bookSeries: [],
            books: ['6473b317569debe2438c7856'],
            createdAt: 1685277243303,
            updatedAt: 1685304087991
          },
          languages: ['Українська'],
          publishedIn: 2020,
          authors: [
            {
              _id: '6473aa0ec9dd40d6f991c587',
              fullName: 'Ілларіон Павлюк',
              books: ['6473b317569debe2438c7856'],
              pictures: [],
              createdAt: 1685301774285,
              updatedAt: 1685304088086
            }
          ],
          compilers: [],
          translators: [
            {
              _id: '6473ab64c9dd40d6f991c5bc',
              fullName: 'Вікторія Стах',
              books: ['6473b317569debe2438c7856'],
              createdAt: 1685302116345,
              updatedAt: 1685304088187
            }
          ],
          illustrators: [],
          editors: [],
          copies: 3000,
          isbns: ['978-617-679-832-3'],
          format: '135х205 мм',
          pages: 664,
          weight: 639,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473b4da569debe2438c787a',
          product: {
            _id: '6473b4d9569debe2438c7871',
            name: 'Триста поезій',
            price: 350,
            quantity: 1,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a4e6c9dd40d6f991c4da',
                name: 'Поезія',
                key: 'poeziya',
                products: ['6473b4d9569debe2438c7871'],
                sections: [],
                createdAt: 1685300454062,
                updatedAt: 1685304537887
              }
            ],
            description:
              'До книги Ліни Костенко — улюбленої української поетеси кінця другого–початку третього тисячоліття — увійшли найвідоміші її вірші з різних періодів творчості — від ранньої поезії до сьогодні, а також уривки з романів та поем. Це найповніше вибране поетеси за часів Незалежності. Книга у подарунковій твердій обкладинці під тканину з жовтим шовковим ляссе.',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/8ada021e-bcad-41e9-9b4a-5dc04f4bffc2.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/11f2f747-2dc2-49a6-8f3a-282e7c94d9e1.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/bc73a152-4666-496d-82a5-c6ab2f5bcf14.webp'
            ],
            createdAt: 1685304537739,
            updatedAt: 1685304537739,
            code: '115969'
          },
          publisher: {
            _id: '64734ad09d7e69643faf5ef1',
            name: 'А-ба-ба-га-ла-ма-га',
            bookSeries: ['6473a950c9dd40d6f991c557'],
            books: ['6473b4da569debe2438c787a', '6473c36c569debe2438c7929'],
            createdAt: 1685277392349,
            updatedAt: 1685308268676
          },
          languages: ['Українська'],
          publishedIn: 2019,
          authors: [
            {
              _id: '64738172baf7acc39da67a08',
              fullName: 'Ліна Костенко',
              books: ['6473b4da569debe2438c787a'],
              pictures: [],
              createdAt: 1685291378087,
              updatedAt: 1685304538234
            }
          ],
          compilers: [
            {
              _id: '6473ab2cc9dd40d6f991c5a6',
              fullName: 'Іван Малкович',
              books: ['6473b4da569debe2438c787a'],
              createdAt: 1685302060474,
              updatedAt: 1685304538289
            },
            {
              _id: '6473ab32c9dd40d6f991c5ad',
              fullName: 'Оксана Пахльовська',
              books: ['6473b4da569debe2438c787a'],
              createdAt: 1685302066626,
              updatedAt: 1685304538289
            }
          ],
          translators: [],
          illustrators: [],
          editors: [],
          series: {
            _id: '6473a950c9dd40d6f991c557',
            name: 'Українська Поетична Антологія',
            publisher: '64734ad09d7e69643faf5ef1',
            books: ['6473b4da569debe2438c787a'],
            createdAt: 1685301584043,
            updatedAt: 1685304538177
          },
          isbns: ['978-617-585-035-0'],
          format: '120x165 мм',
          pages: 416,
          weight: 400,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: ['Сучасна література'],
          literatureCountry: 'Українська література',
          foreignLiterature: false,
          grade: '11-й клас',
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473b63b569debe2438c789e',
          product: {
            _id: '6473b63b569debe2438c7895',
            name: 'Нові Темні Віки. Книга 1. Колонія',
            price: 468,
            quantity: 12000,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a4b3a12216f94b1036d3',
                name: 'Фантастика та фентезі',
                key: 'fantastyka-ta-fentezi',
                products: ['6473b63b569debe2438c7895'],
                sections: [],
                createdAt: 1685300403535,
                updatedAt: 1685304891361
              }
            ],
            description:
              '2141 рік. Людство на Землі ще не оговталося від хвороби клодис, що призвела до найбільшої за пів століття пандемії, коли з’являється новий патоген, який інфікує винятково вагітних жінок. Група вчених-імунологів намагається з’ясувати, що він таке і чи пов’язана його поява з нейтринними спалахами, зафіксованими довкола планети. Чисельність населення марсіанських Колоній перевищує сто тисяч мешканців, і третина з них — народжені на Марсі. Вони програють суперспеціалістам із Землі боротьбу за робочі місця в наукомісткій економіці Марса і змушені гарувати, мов раби, на низькокваліфікованих ручних роботах. Що більше їх сягає повноліття, то дужче вони прагнуть змін, не усвідомлюючи, що ці зміни ставлять під загрозу саме існування Колоній. «Колонія» — перша книга з фантастичного циклу «Нові Темні Віки» про світ у ХХІІ столітті. Це історія про те, що людина, попри всі досягнення цивілізації, не змінюється, й ані збільшення тривалості життя, ні навіть перетворення на двопланетний вид не гарантує людству порятунок.',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/39c8fee4-c144-4542-a353-2f50fe7e6468.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/04c71bea-f72b-4118-9366-9ec3db6b1a8f.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/b7936687-5b9e-4e8f-b703-267a6e676f39.webp'
            ],
            createdAt: 1685304891224,
            updatedAt: 1685304891224,
            code: '115970'
          },
          publisher: {
            _id: '64734ae59d7e69643faf5efa',
            name: 'Бородатий Тамарин',
            bookSeries: [],
            books: ['6473b63b569debe2438c789e'],
            createdAt: 1685277413989,
            updatedAt: 1685304891595
          },
          languages: ['Українська'],
          publishedIn: 2023,
          authors: [
            {
              _id: '647385c920497355e4bbee0d',
              fullName: 'Макс Кідрук',
              books: ['6473b63b569debe2438c789e'],
              pictures: [],
              createdAt: 1685292489966,
              updatedAt: 1685304891681
            }
          ],
          compilers: [],
          translators: [],
          illustrators: [],
          editors: [],
          copies: 12000,
          isbns: ['978-617-95267-0-1'],
          format: '150х235 мм',
          pages: 904,
          weight: 500,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Чорно-білі',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473b733569debe2438c78c0',
          product: {
            _id: '6473b733569debe2438c78b7',
            name: 'Купи собі той довбаний букет: та інші способи зібратися докупи від тієї, котрій вдалось',
            price: 320,
            quantity: 2,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a44ba12216f94b1036cb',
                name: 'Персональні трансформації',
                key: 'personalni-transformaciyi',
                products: ['6473b1aa394b41f5828a5e34', '6473b733569debe2438c78b7'],
                sections: [],
                createdAt: 1685300299603,
                updatedAt: 1685305139480
              }
            ],
            description:
              'В цій книжці авторка розповідає історію власного перевиховання та перетворення на чемпіонку з любові до себе. Завдяки простим щоденним ритуалам Тара змінила свою свідомість, тіло та стосунки і навчить вас, як: вдавати вдячність, поки не відчуєте вдячності насправді розкопати та зцілити любов’ю свої приховані емоційні рани розпізнати несвідомі переконання-самообмеження і позбутися їх розвінчати внутрішнього недруга та захиститися від самокритики розпочинати кожен день наснажено, натхненно й з готовністю блищати створити собі життя, яке ви дійсно, абсолютно, в біса, обожнюватимете! Тираж цієї книги видано із залученням коштів Гранту інституційної підтримки наданих "Українським інститутом книги".',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/a506cbe4-d245-48eb-8902-05c63ef0b984.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/ea63f000-2cbc-4998-aa76-f9fd49136f85.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/c20cb739-1108-4e19-a65c-40e0ef61fde9.webp'
            ],
            createdAt: 1685305139335,
            updatedAt: 1685305139335,
            code: '115971'
          },
          publisher: {
            _id: '6473a8b4c9dd40d6f991c535',
            name: 'Yakaboo Publishing',
            bookSeries: [],
            books: ['6473b733569debe2438c78c0', '6473c260569debe2438c7906'],
            createdAt: 1685301428746,
            updatedAt: 1685308000296
          },
          languages: ['Українська'],
          publishedIn: 2020,
          authors: [
            {
              _id: '6473aa41c9dd40d6f991c593',
              fullName: 'Тара Шустер',
              books: ['6473b733569debe2438c78c0'],
              pictures: [],
              createdAt: 1685301825586,
              updatedAt: 1685305139814
            }
          ],
          compilers: [],
          translators: [
            {
              _id: '6473ab74c9dd40d6f991c5c3',
              fullName: 'Ірина Вікирчак',
              books: ['6473b733569debe2438c78c0'],
              createdAt: 1685302132408,
              updatedAt: 1685305139921
            }
          ],
          illustrators: [],
          editors: [],
          isbns: ['978-617-7544-28-8'],
          firstPublishedIn: 2019,
          originalName:
            'Buy Yourself the F*cking Lilies: And Other Rituals To Fix Your Life, From Someone Who’s Been There',
          format: '145x220 мм',
          pages: 320,
          weight: 300,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473b87b569debe2438c78e3',
          product: {
            _id: '6473b87b569debe2438c78da',
            name: 'Брама Європи. Історія України від скіфських воєн до незалежності',
            price: 350,
            quantity: 10000,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a426a12216f94b1036c4',
                name: 'Україна',
                key: 'ukrayina',
                products: ['6473b87b569debe2438c78da'],
                sections: [],
                createdAt: 1685300262401,
                updatedAt: 1685305467702
              }
            ],
            description:
              'Книга цікаво й доступно розповідає про історію нашої держави від часів Геродота до подій на Сході України сьогодні. Це авторитетне видання допоможе краще зрозуміти події минулого, а через них – і наше сьогодення. Автор фокусує увагу на українцях як найбільшій демографічній групі, а згодом – головній силі, що стояла за створенням сучасної нації. Дізнайтеся, як наші предки «призвали варягів на царювання», як наша країна боролася за право бути незалежною, пройшла крізь часи кріпацтва, комуністичного терору й Голодомору, Другої світової війни та врешті-решт отримала незалежність. «Брама Європи» — це правдива історія нашої країни, наших прагнень та життя! Пориньте у спогади предків та їхні долі, що вирішили наше сьогодення!',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/5391f312-349d-4aeb-b739-33368b501155.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/b8fd3c12-98ab-46b3-a850-c51ea2c44999.webp'
            ],
            createdAt: 1685305467566,
            updatedAt: 1685305467566,
            code: '115972'
          },
          publisher: {
            _id: '64734a279d7e69643faf5ec2',
            name: 'Книжковий клуб "Клуб Сімейного Дозвілля"',
            bookSeries: [],
            books: ['6473b1aa394b41f5828a5e3d', '6473b87b569debe2438c78e3'],
            createdAt: 1685277223872,
            updatedAt: 1685305467933
          },
          languages: ['Українська'],
          publishedIn: 2022,
          authors: [
            {
              _id: '6473aa49c9dd40d6f991c59a',
              fullName: 'Сергій Плохій',
              books: ['6473b87b569debe2438c78e3'],
              pictures: [],
              createdAt: 1685301833499,
              updatedAt: 1685305468018
            }
          ],
          compilers: [],
          translators: [
            {
              _id: '6473ab7ac9dd40d6f991c5ca',
              fullName: 'Роман Клочко',
              books: ['6473b87b569debe2438c78e3'],
              createdAt: 1685302138525,
              updatedAt: 1685305468157
            }
          ],
          illustrators: [],
          editors: [],
          isbns: ['978-617-12-1056-1'],
          originalName: 'The Gates of Europe. A History of Ukraine',
          font: 'MinionPro',
          format: '150x220 мм',
          pages: 496,
          weight: 552,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Карти',
          literaturePeriod: [],
          timePeriod: 'Первісне суспільство. Стародавній світ. Античність',
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473c260569debe2438c7906',
          product: {
            _id: '6473c25f569debe2438c78fd',
            name: 'Жінки, що біжать з вовками. Архетип Дикої жінки у міфах та легендах',
            price: 420,
            quantity: 3,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a075a12216f94b103660',
                name: 'Гендерні дослідження. Фемінізм',
                key: 'henderni-doslidzhennya-feminizm',
                products: ['6473c25f569debe2438c78fd'],
                sections: [],
                createdAt: 1685299317166,
                updatedAt: 1685308000066
              }
            ],
            description:
              'Книжку постійно видають ось уже впродовж 25 років, у світі загалом продано більше двох мільйонів примірників. Вона 144 тижні трималась у списку бестселерів New York Times. Анотація: На думку доктора психології Клариси Пінколи Естес, здорові вовки та здорові жінки мають певні спільні психічні характеристики: гостроту відчуття, грайливий дух і глибоку відданість. Вовки й жінки споріднені за природою, допитливі, наділені витривалістю й силою. Вивчаючи вовків, доктор Естес вперше викристалізувала концепт архетипу Дикої жінки. У книжці, яка стала світовим бестселером і сенсацією The New York Times, Естес розкриває цей архетип, розшифровує давні легенди і давно відомі дитячі казки, а також пояснює його на прикладах зі своєї психоаналітичної практики. «Жінки, що біжать з вовками» почалася як нотатки 1970 року, а вже 1971-го Естес узялася за текст. Авторка завершила книжку, «працю про любов і воскресіння жінок нашого світу», за двадцять років; за цей час їй 42 рази відмовили в публікації, аж доки книжка вперше побачила світ у видавництві Ballantine/Random House 1992 року. У 1995-му вийшло оновлене видання з додатком і новою вовчою казкою. Про українське видання: До створення українського видання книжки долучилася трансдисциплінарний митець Олена Невертій (проект Para Platform). На обкладинці - фрагмент сакрального танцю, присвяченого пробудженню Духу та очищенню першоелементами: Землею, Вогнем, Простором, Водою, Повітрям. Кожному елементу відповідає свій танець, який формує гармонійні відносини із Планетою, як живим організмом. На жінках одіяння з натуральної вовни, виткані за старовинними технологіями, переосмисленими та вдосконаленими, щоб стати мостом між спадком предків та надбанням сучасності, зв’язавши береги часу воєдино. До сотворення  долучилися найкращі майстри ткацтва Українських Карпат, об’єднані ідеєю популяризувати архаїчні форми мистецтва та ручну працю в цілому, як потужний акт колективного зцілення. Відгуки: Олена Невертій вперше прочитала книжку Клариси Пінколи Естес 2015 року:  "«Та, що біжить з вовками» - храм душі, літопис - пробудження. Книга символізує безкінечне життя. Всередині неї великий світ, такий живий та насичений, в якому кожен може згадати себе, розрити свою глибинну природу". "Одна з найважливіших книжок мого життя. Це якщо коротко і з пафосом. А якщо детально і приземлено, то беріть її до рук і біжіть з вовками: це неймовірний скарб. Ви відкриватимете її, і наче зовсім випадково будете натрапляти на актуальну ситуацію свого життя. Книга правди, потаємної і проникливої. Книга катарсису: ви неодмінно заплачете, бо вона про вас і вам допоможе. Книга секрету: ховайте її від звичайних чоловіків (але підсовуйте чоловікам незвичайним). Тішуся українському перекладу. Люблю Естес". — Ірена Карпа, письменниця, співачка, перша секретарка з питань культури Посольства України у Франції.',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/d302c717-4d60-4976-8d1b-7be78137ba1d.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/679cee19-97d2-4a95-ad84-aa46b026bf2b.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/d2648db9-ce5e-4cb3-90ca-cf82f91099a2.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/274cd55e-9d0b-4f20-a779-252201e325ec.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/824d8638-c0b1-425a-a9c2-e741db1849cb.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/4ef032f2-c0c2-4e44-a8ac-5c64efe38a97.webp'
            ],
            createdAt: 1685307999909,
            updatedAt: 1685307999909,
            code: '115973'
          },
          publisher: {
            _id: '6473a8b4c9dd40d6f991c535',
            name: 'Yakaboo Publishing',
            bookSeries: [],
            books: ['6473b733569debe2438c78c0', '6473c260569debe2438c7906'],
            createdAt: 1685301428746,
            updatedAt: 1685308000296
          },
          languages: ['Українська'],
          publishedIn: 2019,
          authors: [
            {
              _id: '6473860620497355e4bbee14',
              fullName: 'Клариса Пінкола Естес',
              books: ['6473c260569debe2438c7906'],
              pictures: [],
              createdAt: 1685292550475,
              updatedAt: 1685308000386
            }
          ],
          compilers: [],
          translators: [
            {
              _id: '6473ab7fc9dd40d6f991c5d1',
              fullName: 'Наталія Валевська',
              books: ['6473c260569debe2438c7906'],
              createdAt: 1685302143701,
              updatedAt: 1685308000510
            }
          ],
          illustrators: [],
          editors: [],
          isbns: ['978-617-7544-16-5'],
          firstPublishedIn: 1992,
          originalName:
            'Women Who Run With the Wolves. Mythes and Stories of the Wild Woman Archetype',
          format: '70х100/16 (170х240 мм)',
          pages: 528,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473c36c569debe2438c7929',
          product: {
            _id: '6473c36c569debe2438c7920',
            name: 'Короткий курс історії України',
            price: 340,
            quantity: 4,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a0c0a12216f94b103667',
                name: 'Саморозвиток і мотивація',
                key: 'samorozvytok-i-motyvaciya',
                products: ['6473c36c569debe2438c7920', '6473c5e4569debe2438c7974'],
                sections: ['6473a44ba12216f94b1036cb'],
                createdAt: 1685299392935,
                updatedAt: 1685308900342
              }
            ],
            description:
              "Пропонуємо вашій увазі книгу Олександра Палія «Короткий курс історії України» українською мовою від видавництва «А-ба-ба-га-ла-ма-га»! Про книгу: Історія грає серйозну роль у сучасності. Вона підносить нам цінні уроки та допомагає зрозуміти причини явищ нашого часу. Щоб дати зрозуміти яким було життя українського народу з давніх часів, була написана книга «Короткий курс історії України». Це своєрідний підручник з історії України, що розповість про її перемоги та поразки, ворогів та героїв, стійкість духу її народу та спроби його підкорити. Завдяки книзі «Короткий курс історії України» читач дізнається: які племена жили на сучасній території України хто заснував Київ про період правління українського козацтва ким був Тарас Шевченко для історії України з якими проблемами зіткнулася Україна після розвалу Радянського Союзу … та багато іншого! Чому варто купити книгу «Короткий курс історії України» Олександра Палія? «Короткий курс історії України» — книга, написана талановитим істориком та політичним консультантом, яка дасть уявлення про найважливіші повороти в розвитку України протягом всієї історії її існування та навіть задовго до цього — починаючи з виникнення виду Homo Sapiens та Льодовикового періоду і закінчуючи подіями останніх п'яти років. Книга «Короткий курс історії України» заслуговує на позитивні відгуки від читачів. Вона призначена як для студентів та вступників до ВНЗ як навчальний посібник, так і всіх інших, хто хоче ознайомитися з історією України.",
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/ea868218-2ad0-4fa1-95c3-71b6aa4a8334.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/46d793c1-de96-44f9-8873-352e2c510b6d.webp'
            ],
            createdAt: 1685308268306,
            updatedAt: 1685308268306,
            code: '115974'
          },
          publisher: {
            _id: '64734ad09d7e69643faf5ef1',
            name: 'А-ба-ба-га-ла-ма-га',
            bookSeries: ['6473a950c9dd40d6f991c557'],
            books: ['6473b4da569debe2438c787a', '6473c36c569debe2438c7929'],
            createdAt: 1685277392349,
            updatedAt: 1685308268676
          },
          languages: ['Українська'],
          publishedIn: 2023,
          authors: [
            {
              _id: '6473860b20497355e4bbee1b',
              fullName: 'Олександр Палій',
              books: ['6473c36c569debe2438c7929'],
              pictures: [],
              createdAt: 1685292555903,
              updatedAt: 1685308268761
            }
          ],
          compilers: [],
          translators: [],
          illustrators: [],
          editors: [],
          isbns: ['978-617-585-123-4'],
          format: '120x165 мм',
          pages: 464,
          weight: 390,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Кольорові',
          literaturePeriod: [],
          timePeriod: 'Первісне суспільство. Стародавній світ. Античність',
          suitableAge: ['Підліткам'],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473c4f0569debe2438c7958',
          product: {
            _id: '6473c4ef569debe2438c794f',
            name: 'Мистецтво говорити. Таємниці ефективного спілкування',
            price: 320,
            quantity: 500,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a2bea12216f94b103684',
                name: 'Прикладна психологія',
                key: 'prykladna-psyxolohiya',
                products: ['6473c4ef569debe2438c794f'],
                sections: [],
                createdAt: 1685299902017,
                updatedAt: 1685308656052
              }
            ],
            description:
              'Бізнес-тренер Джеймс Борґ, відомий своїми відкриттями в галузях спілкування, особистісного розвитку, мови тіла та «контролю мислення», пропонує прості і дієві поради для кожної людини. Його методика допоможе змінити спосіб мислення і поведінку в особистому житті й на роботі, зробить життя цікавішим, насиченішим і позбавить зайвого стресу, а ваші навички спілкування сягнуть геть нового рівня.',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/3de802f9-836c-42ac-b6d9-a3aeae97f82d.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/fc0db011-8f6e-4462-8627-4929f44857cc.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/71ce4a05-c283-49f5-a289-76aaa242274c.webp'
            ],
            createdAt: 1685308655907,
            updatedAt: 1685308655907,
            code: '115975'
          },
          publisher: {
            _id: '6473a8ecc9dd40d6f991c53f',
            name: 'Фабула',
            bookSeries: ['6473a980c9dd40d6f991c561'],
            books: ['6473c4f0569debe2438c7958'],
            createdAt: 1685301484183,
            updatedAt: 1685308656294
          },
          languages: ['Українська'],
          publishedIn: 2019,
          authors: [
            {
              _id: '647385bd20497355e4bbee06',
              fullName: 'Джеймс Борг',
              books: ['6473c4f0569debe2438c7958'],
              pictures: [],
              createdAt: 1685292477185,
              updatedAt: 1685308656394
            }
          ],
          compilers: [],
          translators: [
            {
              _id: '6473ab89c9dd40d6f991c5d8',
              fullName: 'Наталія Лазаревич',
              books: ['6473c4f0569debe2438c7958'],
              createdAt: 1685302153534,
              updatedAt: 1685308656500
            }
          ],
          illustrators: [],
          editors: [],
          series: {
            _id: '6473a980c9dd40d6f991c561',
            name: '#PROMe',
            publisher: '6473a8ecc9dd40d6f991c53f',
            books: ['6473c4f0569debe2438c7958'],
            createdAt: 1685301632057,
            updatedAt: 1685308656344
          },
          isbns: ['978-617-09-5579-1'],
          firstPublishedIn: 2016,
          originalName: 'Talkability: Discover the Secrets of Effective Conversation',
          font: 'Minion',
          format: '84х108/32 (~135х205 мм)',
          pages: 304,
          weight: 380,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473c5e4569debe2438c797d',
          product: {
            _id: '6473c5e4569debe2438c7974',
            name: 'Правила Дорожнього Руху України 2023 з коментарями та ілюстраціями',
            price: 248,
            quantity: 2000,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a0c0a12216f94b103667',
                name: 'Саморозвиток і мотивація',
                key: 'samorozvytok-i-motyvaciya',
                products: ['6473c36c569debe2438c7920', '6473c5e4569debe2438c7974'],
                sections: ['6473a44ba12216f94b1036cb'],
                createdAt: 1685299392935,
                updatedAt: 1685308900342
              }
            ],
            description:
              'Що ви знайдете у цій книзі: Найактуальніший текст Правил дорожнього руху, а також УСІ найостанніші зміни! Детальні коментарі до пунктів правил дорожнього руху;Кольорові ілюстрації, дорожні знаки та розмітку у тексті Правил;Основні поєднання дорожніх знаків з табличками до них;Роз’яснення з ОСЦПВ та особливості оформлення Європротоколу;Перелік обов’язкових лікарських засобів в аптечці;Інформацію щодо першої медичної допомоги при ДТП',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/e676f0cf-79bc-455a-b0a1-401889cd2c76.webp'
            ],
            createdAt: 1685308900208,
            updatedAt: 1685308900208,
            code: '115976'
          },
          publisher: {
            _id: '6473a8f4c9dd40d6f991c548',
            name: 'Моноліт',
            bookSeries: ['6473a992c9dd40d6f991c56b'],
            books: ['6473c5e4569debe2438c797d'],
            createdAt: 1685301492533,
            updatedAt: 1685308900566
          },
          languages: ['Українська'],
          publishedIn: 2022,
          authors: [],
          compilers: [],
          translators: [],
          illustrators: [],
          editors: [],
          series: {
            _id: '6473a992c9dd40d6f991c56b',
            name: 'Навчальна література',
            publisher: '6473a8f4c9dd40d6f991c548',
            books: ['6473c5e4569debe2438c797d'],
            createdAt: 1685301650366,
            updatedAt: 1685308900609
          },
          isbns: ['978-617-577-368-0'],
          format: '210х297 мм',
          pages: 224,
          paperType: 'Офсетний',
          bindingType: "М'яка",
          illustrationsType: 'Кольорові',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473c67f569debe2438c799f',
          product: {
            _id: '6473c67e569debe2438c7996',
            name: 'Фактор Черчилля. Як одна людина змінила історію',
            price: 340,
            quantity: 10,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a320a12216f94b103693',
                name: 'Політичні фігури',
                key: 'politychni-fihury',
                products: ['6473c67e569debe2438c7996'],
                sections: [],
                createdAt: 1685300000875,
                updatedAt: 1685309055038
              }
            ],
            description:
              'Книжка Боріса Джонсона — це історія про те, як ексцентричний геній Черчилля, прем’єр-міністра Великої Британії, одного з найвизначніших лідерів ХХ століття, формував світову політику. Аналізуючи досягнення й помилки, а також міфи, які супроводжували цю видатну постать, Джонсон зобразив Черчилля як незрівнянного стратега, людину надзвичайно сміливу, красномовну й глибоко гуманну. Безстрашний на полі бою, один із найкращих ораторів усіх часів, лауреат Нобелівської премії з літератури, Вінстон Черчилль спростував думку, що історія — це місце дії великих знеособлених сил. Життя цього чоловіка є доказом того, що одна людина — відважна, геніальна, визначна — може впливати на світовий лад',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/86427eca-030c-4313-9d70-da1752c521be.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/bfd4b1b6-88d9-47d8-8d44-67c71f50d8da.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/f0eccc19-1175-4e29-8a1f-08748b1a6060.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/c2dda2b5-bbc0-408b-8018-042ea2b9eb41.webp'
            ],
            createdAt: 1685309054882,
            updatedAt: 1685309054882,
            code: '115977'
          },
          publisher: {
            _id: '64734a549d7e69643faf5edd',
            name: 'Vivat',
            bookSeries: [],
            books: ['6473c67f569debe2438c799f'],
            createdAt: 1685277268138,
            updatedAt: 1685309055282
          },
          languages: ['Українська'],
          publishedIn: 2019,
          authors: [
            {
              _id: '647385b020497355e4bbedf8',
              fullName: 'Боріс Джонсон',
              books: ['6473c67f569debe2438c799f'],
              pictures: [],
              createdAt: 1685292464117,
              updatedAt: 1685309055392
            }
          ],
          compilers: [],
          translators: [],
          illustrators: [],
          editors: [],
          isbns: ['978-966-942-796-0'],
          format: '150x205 мм',
          pages: 400,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: [],
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        },
        {
          _id: '6473c84b569debe2438c79c2',
          product: {
            _id: '6473c84b569debe2438c79b9',
            name: '1984',
            price: 200,
            quantity: 1000,
            type: {
              _id: '64737fee4adab164082714b6',
              name: 'Книга',
              createdAt: 1685290990575,
              updatedAt: 1685290990575
            },
            sections: [
              {
                _id: '6473a36da12216f94b1036a1',
                name: 'Антиутопія',
                key: 'antyutopiya',
                products: ['6473c84b569debe2438c79b9'],
                sections: [],
                createdAt: 1685300077100,
                updatedAt: 1685309515311
              }
            ],
            description:
              'Бажаєте розібратися у реаліях сьогодення? Тоді радимо придбати книгу «1984». Дивно, але реалії твору, написаного у жанрі антиутопії більше 60 років тому, у деталях збігаються з тими, що ми спостерігаємо у наші дні. Модель майбутнього від Джорджа Орвелла у книзі «1984» Незважаючи на художню вигадку, книга настільки реалістична, що перевертає свідомість, причому так, що хочеться перевернути її назад. Сам письменник стверджував, що «найкращі книги говорять тобі те, що ти вже сам знаєш». І роман-утопія «1984» описує речі, про які ми самі здогадувалися, але у існування яких боялися повірити. У творі представлено суспільство майбутнього, де йде війна усіх проти всіх. Події розгортаються у державі під назвою Океанія. Політичний устрій країни — англійський соціалізм, але по суті це жорстокий тоталітаризм. Головний герой живе у Лондоні і працює у Міністерстві Правди, старанно вилучаючи з документів те, що не відповідає офіційній пропаганді. При цьому він людина, що глибоко відчуває і мислить, а тому ненавидить тоталітарний світоустрій і мріє про революцію. Основний конфлікт простий: особистість проти системи, тяга до любові й свободи проти поневолення та диктату. Але автор нещадний. Зображену ним систему неможливо перемогти, тому що не можна перемогти те, у чого немає ні серця, ні мозку, ні сенсу, ні цілей існування. Як такої немає й ідеології, де можна було б шукати вади: усе знищено укупі зі здоровим ґлуздом. Є лише влада заради влади. А людство надіслано на бійню, де гинуть не стільки тіла, скільки душі, оскільки розум, пам’ять, гуманізм та любов оголошені поза законом. У відгуках про книгу «Тисяча дев’ятсот вісімдесят чотири» читачі називають твір геніальним. Але рекомендують книгу не оптимістам і навіть не песимістам, а цинічним реалістам, готовим до правди, якою б гіркою вона не була. Придбати книгу «1984» в Україні можна у літературному розділі нашого сайту.',
            reviews: [],
            images: [
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/529f196d-33f4-4dad-bec4-0c931bfce567.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/94d6acf8-a69f-4fa9-a709-08ba52ef6db5.webp',
              'https://historium-bucket-eu.s3.eu-central-1.amazonaws.com/89eb0508-31e1-4897-87eb-864456a60e71.webp'
            ],
            createdAt: 1685309515156,
            updatedAt: 1685309515156,
            code: '115978'
          },
          publisher: {
            _id: '64734aff9d7e69643faf5f03',
            name: 'Видавництво Жупанського',
            bookSeries: ['6473a9b1c9dd40d6f991c575'],
            books: ['6473c84b569debe2438c79c2'],
            createdAt: 1685277439138,
            updatedAt: 1685309515539
          },
          languages: ['Українська'],
          publishedIn: 2015,
          authors: [
            {
              _id: '647385b620497355e4bbedff',
              fullName: 'Джордж Орвелл',
              books: ['6473c84b569debe2438c79c2'],
              pictures: [],
              createdAt: 1685292470555,
              updatedAt: 1685309515627
            }
          ],
          compilers: [],
          translators: [
            {
              _id: '6473ab94c9dd40d6f991c5df',
              fullName: 'Віктор Шовкун',
              books: ['6473c84b569debe2438c79c2'],
              createdAt: 1685302164267,
              updatedAt: 1685309515726
            }
          ],
          illustrators: [],
          editors: [],
          series: {
            _id: '6473a9b1c9dd40d6f991c575',
            name: 'Майстри світової прози / Майстри готичної прози',
            publisher: '64734aff9d7e69643faf5f03',
            books: ['6473c84b569debe2438c79c2'],
            createdAt: 1685301681249,
            updatedAt: 1685309515583
          },
          isbns: ['978-966-2355-57-4'],
          firstPublishedIn: 1949,
          originalName: 'Nineteen Eighty-Four',
          format: '84х108/32 (~130x210 мм)',
          pages: 312,
          weight: 280,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: 'Немає ілюстрацій',
          literaturePeriod: ['Література XX ст.'],
          literatureCountry: 'Література Англії, Австралії та Нової Зеландії',
          suitableAge: [],
          occasion: [],
          style: [],
          suitableFor: []
        }
      ]
    }
  },
  methods: {
    isAvailable(good) {
      return good.product.quantity > 0
    }
  }
}
</script>

<style></style>
