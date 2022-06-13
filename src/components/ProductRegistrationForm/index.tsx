import { 
  Checkbox, 
  CircularProgress, 
  FormControl,
  FormControlLabel, 
  FormGroup, 
  MenuItem, 
  Select, 
  TextField 
} from '@mui/material';

import { 
  ChangeEvent, 
  FormEvent, 
  useEffect, 
  useState 
} from 'react';

import { FiPlus } from "react-icons/fi";
import { api } from '../../../services/api';
import { Category } from '../../pages';
import styles from './styles.module.scss';
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify';

type InputProps = (data: string, val: any) => void

type FormSubmitProps = (data: {
  name: string
  description: string
  price: string
  category: string
  images: File[]
  productSize?: string[]
  colors?: string[]
}) => Promise<void>


export interface ProductProps {
  name: string
  description: string
  price: string
  category: string
  images: File[]
  productSize: string[]
  colors?: string[]
}

export default function ProductRegistrationForm() {
  const [ name, setName ] = useState('')
  const [ description, setDecription ] = useState('')
  const [ price, setPrice ] = useState<number>()
  const [ category, setCategory ] = useState('')
  const [ files, setFiles ] = useState<File[]>([])
  const [ productSize, setProductSize ] = useState<string[]>([])
  const [ colors, setColors ] = useState<string[]>([])
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ response, setResponse] = useState<any>()

  const [previewImages,setPreviewImages] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>()
  const { accessToken } = useAuth()



  const selectFn = (event: EventTarget & HTMLSelectElement) => setCategory(event.value)



  function handleAddInput(event: React.FormEvent<HTMLDivElement>) {
    event.preventDefault()
    console.log('dd',)
    setColors([...colors, ''])
  }

  async function submitProduct (event:FormEvent) {
    event.preventDefault()
    setIsLoaded(!isLoaded)

    const data = new FormData()
    data.append('name',name)
    data.append('description', description)
    data.append('price', String(price))
    data.append('category', category)

  
    colors.forEach(color => {
      data.append('colors', color)
    })
    
   

    productSize.forEach(size => {
      data.append('productSize',size)
    })

    files.forEach(image => {
      data.append('files',image)
    })


    try { 
      console.log('col',accessToken)
      const res = await api.post('products',data, {
        headers: {
          'x-access-token': `${accessToken}`
        }
      })

      setIsLoaded(!!isLoaded)
      console.log(res)
      if(res.status === 204) {
        toast.success('Produto registrado com sucesso!')
      }
   
    } catch(err:any) {
      setIsLoaded(!!isLoaded)
      if(err.response.status === 400) {
        toast.error('Campo Obrigatório não preenchido!')
      }
    }
  }

  async function getCategories() {
    const categoriesData = await api.get('categories')
    const ct = categoriesData.data
    setCategories(ct)
  }

  useEffect(() => {
    console.log(colors)
    getCategories()
  },[colors])

 
  function handleSelectImages(event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files)
    setFiles(selectedImages)
    

    const selectedImagesPreview = selectedImages.map( img => {
      return URL.createObjectURL(img)
    })

    setPreviewImages(selectedImagesPreview)
  }

  function handleChangeColor(value: string, index:number) {
    if(colors){
      colors[index] = value
      setColors([...colors])
    }
  }



  function handleSizes(value: string) {
    const check = productSize.every(item => {
      console.log('it',item)
      return item === value 
    })
    
    console.log('oi',productSize.length)
    console.log('oi2',check)

    if(check && productSize.length > 0) {
      console.log('oi',productSize.length > 0)
      var index = productSize.indexOf(value);
      console.log('i', index)
      productSize.slice(index, 1)
    } else {
      const selectedSize: string[] = Array.from(value) 
      const newSelected = [...selectedSize]
      const sizesJoined = newSelected.join('')
      var sizePushed = []
      sizePushed.push(sizesJoined)
      console.log('ves',sizePushed)
      setProductSize([...productSize, ...sizePushed])
    }
  }


  return (
    <div className={styles.prodRegisterContainer}>
      <h2> Cadastrar produto </h2>
      <form 
        onSubmit={submitProduct}
      >
        <div className={styles.inputData}>
          <label htmlFor=""> Nome</label>
          <TextField 
            id="standard-basic" 
            variant="standard" 
            color='secondary'
            style={{backgroundColor: 'white'}}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
     
        <div className={styles.inputData}>
          <label htmlFor=""> Descrição </label>
          <TextField 
            id="standard-basic" 
            variant="standard" 
            color='secondary' 
            style={{backgroundColor: 'white'}}
            value={description}
            onChange={(e) => setDecription(e.target.value)}
          />
        </div>


        <div className={styles.inputData}>
          <label htmlFor=""> Preço </label>
          <TextField 
            id="standard-basic" 
            variant="standard" 
            color='secondary' 
            style={{backgroundColor: 'white'}}
       
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
   
        <div className={styles.inputData}>
          <label htmlFor=""> Categoria </label>
          <FormControl fullWidth variant="filled">
            
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label="categoria"
              defaultValue=''
              style={{backgroundColor: 'white', fontFamily: 'Poppins', }}
              onChange={(e) => selectFn((e.target as HTMLSelectElement))}
            >
              {categories?.map((value, index) => (
                <MenuItem 
                  key={index} 
                  value={value.name}
                > 
                  {value.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>


        <div className={styles.inputColors}>
          <label htmlFor="">Cores(Hexadecimal)</label>


          {colors?.map((value, index) => (
            <TextField
              key={index}
              id="standard-basic"
              variant="standard" 
              color='secondary' 
              style={{backgroundColor: 'white', marginBottom: '22px'}}
              
              onChange={(e) => {handleChangeColor((e.target as HTMLInputElement).value, index)}}
            />
          ))}

          <div className={styles.addColor} onClick={handleAddInput}>Adicionar cor +</div>
        </div>

        <div className={styles.productSizes}>
          <label htmlFor=""> Tamanhos disponíveis </label>
          <div 
            className={styles.sizes} 
            
          >
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox />} 
              label="P" 
              value="P" 
              onChange={(e) => {handleSizes((e.target as HTMLInputElement).value)}}
            />

            <FormControlLabel 
              control={<Checkbox />} 
              label="M" 
              value="M"
              onChange={(e) => {handleSizes((e.target as HTMLInputElement).value)}}
            />

            <FormControlLabel 
              control={<Checkbox />} 
              label="G" 
              value="G"
              onChange={(e) => {handleSizes((e.target as HTMLInputElement).value)}}
            />

            <FormControlLabel 
              control={<Checkbox />} 
              label="GG" 
              value="GG"
              onChange={(e) => {handleSizes((e.target as HTMLInputElement).value)}}
            />

            <FormControlLabel 
              control={<Checkbox />}
              label="XGG"
              value="XGG"
              onChange={(e) => {handleSizes((e.target as HTMLInputElement).value)}}
            />

          </FormGroup>
            
          </div>
        </div>
     
     
        <div className={styles.inputBlock}>
          <label 
            htmlFor="" 
            className={styles.titleImg}
          > 
            Imagens 
          </label>

          <div className={styles.imagesContainer}>  

            {previewImages.map(image => {
              return (          
                <img key={image} src={image} />              
              )
            })}
    
            <label htmlFor="image[]" className={styles.newImage}>      
              <FiPlus size={24} color='#6F48C9'/>
            </label>

            <input 
              multiple 
              onChange={handleSelectImages} 
              type="file" 
              id="image[]"
            />
          </div> 
        </div>

        { !isLoaded ? 
        <button 
          className={styles.confirmButton} 
          type="submit"
        >
          Cadastrar
        </button> 
        : 
        <div className={styles.loader}>
          <CircularProgress color='secondary'/>
        </div>
      }

      </form>
    </div>
  )
}