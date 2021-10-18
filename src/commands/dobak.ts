import Command from '../interfaces/Command'
import { I, D } from '../aliases/discord.js.js'
import { db } from '../variable/database'

export default class PingCommand implements Command {
  /** 실행되는 부분입니다. */
  async run (interaction: I) {
    const [userid] = await db.select('*').from('users').where('userid', interaction.user.id)
    const randoms = {
      random1: Math.floor(Math.random() * ((100 - (userid.try * 8)) - 1) + 1),
      random2: Math.floor(Math.random() * (10 - 1) + 1)
    }
    if (!userid) {
      await interaction.editReply('가입하신적이 없는 계정 입니다. `/가입`을 사용하셔서 가입을 완료해 주세요!')
    }
    const money = interaction.options?.getNumber('money')!
    await db.update({ money: userid.money - money, try: userid.try + 1 }).where('userid', interaction.user.id).from('users')
    if (money > userid.money) {
      await interaction.editReply('현재 가지고 계시는 돈 보다 많은 금액을 거시면 안돼요! \n`현재 가지고 계신 돈: ' + userid.money + '원`')
      return
    }
    if (money < 500) {
      await interaction.editReply('500원 미만의 배팅 금액은 받지 않습니다')
    } else {
      if (randoms.random1 >= 50) {
        await db.update({ try: 0 }).from('users').where('userid', interaction.user.id)
        if (randoms.random2 >= 4) {
          await db.update({ money: userid.money + (money * 2) }).where('userid', interaction.user.id).from('users')
          await interaction.editReply('성공! `' + money + '원`의 2배의 금액을 얻으셨습니다. `+' + money * 2 + '원`')
        } else if (randoms.random2 >= 7) {
          await db.update({ money: userid.money + (money * 3) }).where('userid', interaction.user.id).from('users')
          await interaction.editReply('성공! `' + money + '원`의 3배의 금액을 얻으셨습니다. `+' + money * 3 + '원`')
        } else if (randoms.random2 >= 9) {
          await db.update({ money: userid.money + (money * 4) }).where('userid', interaction.user.id).from('users')
          await interaction.editReply('성공! `' + money + '원`의 4배의 금액을 얻으셨습니다. `+' + money * 4 + '원`')
        } else {
          await db.update({ money: userid.money + (money * 5) }).where('userid', interaction.user.id).from('users')
          await interaction.editReply('성공! `' + money + '원`의 5배의 금액을 얻으셨습니다. `+' + money * 5 + '원`')
        }
      } else {
        await interaction.editReply('실패.. 돈을 잃으셨습니다. `-' + money + '원`')
      }
    }
  }

  /** 해당 명령어의 대한 설정입니다. */
  metadata = <D>{
    name: '도박',
    description: '도박으로 인생을 성공해보세요',
    options: [
      { name: 'money', description: '도박 - 배팅 금액', type: 'NUMBER', required: true }
    ]
  }
}
