import seedMain from './../seed/seed_main'
/**
 * 初期データ投入
 */
export default function seed(all:boolean, tables:string[], update:boolean, destroy:boolean):void {
  seedMain(all, tables, update, destroy).then()
}