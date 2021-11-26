# Book Directory

<% authors.forEach(author => { %>
  <% console.log(author) %>
  <% if (author.id == book.author) { %>
  <option selected value="ad" value="<%= author.id %>">
  <%  } else { %>
    <option value="<%= author.name %>" name="<%= author.id %>">
  <% } %>
<% }) %>