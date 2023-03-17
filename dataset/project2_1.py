from bs4 import BeautifulSoup
import urllib.request
import requests
import re  
import pandas as pd
import xlsxwriter

#추리, 판타지, SF, 호러, 무협, 스릴러, 로맨스
genre_list = [50926 , 50928, 50930, 50931, 50932, 50933, 50935]
page_list = [1,2,3]

result = []

final_book_name = []
final_author_name = []
final_page_name = []
final_genre_name = []
final_image_name = []
final_award_name = []
final_num = []

def Cut(thing) :
   
   ans = thing[0]
   
   return ans

        
def Cut_page(page) :
   a = page.split('쪽')
   num = re.sub(r'[^0-9]','', a[0])
   
   return num

def Cut_award(thing_list, num) :
    a = thing_list.split()
    aa = re.sub(r'[^0-9]','',a[0])
    
    aa = float(aa)/float(10)
    '%0.1f' % aa
    
    return aa

ans3 = []
def Cut_genre(thing_list) :
   ans = set(thing_list)
   ans2 = list(ans)
   
   ans2.remove('국내도서')
   ans2.remove('접기') 
   

   return ans2    
    
    
def go_detail(num, idx) :
    enter_url = "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId="
    main_url = enter_url + idx

    req=  requests.get(main_url)
    content = req.content
    
    soup = BeautifulSoup(content, 'html.parser')
    
    book_name_elems = soup.select('a.Ere_bo_title')
    book_author_elems = soup.select('a.Ere_sub2_title')
    book_page_elems = soup.select('div.conts_info_list1')
    book_genre_elems = soup.select('div.conts_info_list2>ul>li>a')
    book_award_elems = soup.select('div.info_list>a')

    
    book_images = []
    for i in soup.select('div.swiper-slide img'):
        i = i.get('src')
        book_images.append(i)

    book_name = list(map(lambda x : x.text , book_name_elems))
    book_name = Cut(book_name)
    
    book_author = list(map(lambda x : x.text , book_author_elems))
    book_author = Cut(book_author)
    
    book_page = list(map(lambda x: x.text, book_page_elems))
    book_page = Cut_page(book_page[0])
    
    book_genre = list(map(lambda x: x.text, book_genre_elems))
    book_genre = Cut_genre(book_genre)
    
    book_award = list(map(lambda x:x.text, book_award_elems))
    
    book_award = Cut_award(book_award[0], num)
    
    book_image = Cut(book_images)

    final_book_name.append(book_name)
    final_author_name.append(book_author)
    final_page_name.append(book_page)
    final_genre_name.append(book_genre)
    final_image_name.append(book_image)
    final_award_name.append(book_award)
    final_num.append(num)
    
    
    
def Start(num , genre, page) : 
    url = "https://www.aladin.co.kr/shop/wbrowse.aspx?BrowseTarget=List&ViewRowsCount=50&ViewType=Detail&PublishMonth=0&SortOrder=2&page="
    url = url + str(page)
    url = url + "&Stockstatus=1&PublishDay=84&CID="
    url = url + str(genre)
    url = url + "&SearchOption="
    
    req = urllib.request.Request(url)
    sourceCode = urllib.request.urlopen(url).read()
    soup =BeautifulSoup(sourceCode, "html.parser")

    links = soup.find_all('div', {'class':'cover_area'})

    book_tags = soup.find_all('div', class_="cover_area")
    book_links = [tag.find('a').get('href','') if tag.find('a') else '' for tag in book_tags]

    page_arr_dir = []

    for i in book_links :
        numbers=  re.sub(r'[^0-9]', '', i)
        page_arr_dir.append(numbers)
        
    for i in page_arr_dir:
        go_detail(num , i)
        
    df_col = []
    df_col = [final_num, final_book_name , final_author_name, final_genre_name , final_page_name , final_image_name, final_award_name]
    
    column_name = ['label' , 'book_name', 'book_author', 'book_genre' , 'book_page', 'book_image', 'book_award'] 
    df = pd.DataFrame(df_col, index=column_name)
    df.to_excel('test.xlsx')
    


genre_list_size = len(genre_list)
page_list_size = len(page_list)

for i in range(genre_list_size):
    for j in range(page_list_size):
        Start(i+1, genre_list[i], page_list[j])
        
        print("finish {} {} parsing".format(genre_list[i] , page_list[j]))
